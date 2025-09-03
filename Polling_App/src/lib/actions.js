'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { supabase } from './supabase';

const STORAGE_BUCKET = 'poll-images'; // replace with your bucket name
const STORAGE_PREFIX = 'poll_images';

// Small helper to centralize file uploads to Supabase Storage
async function uploadFileToBucket(file, { bucket, prefix } = {}) {
  if (!file || !file.size) return { path: null, error: null };

  const ext = file.name?.split('.').pop() || 'bin';
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;
  const filePath = prefix ? `${prefix}/${fileName}` : fileName;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      upsert: false,
    });

  if (error) return { path: null, error };
  return { path: data.path, error: null };
}

// Util: normalize and validate simple strings
function normalizeInput(value) {
  return (value ?? '').toString().trim();
}

export async function createPoll(formData) {
  const title = normalizeInput(formData.get('title'));
  const option1 = normalizeInput(formData.get('option1'));
  const option2 = normalizeInput(formData.get('option2'));
  const image = formData.get('image');

  if (!title || !option1 || !option2) {
    return { ok: false, error: 'Title and two options are required.' };
  }

  // Upload image if provided
  let imagePath = null;
  if (image && image.size > 0) {
    const { path, error: uploadError } = await uploadFileToBucket(image, {
      bucket: STORAGE_BUCKET,
      prefix: STORAGE_PREFIX,
    });
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return { ok: false, error: 'Failed to upload image.' };
    }
    imagePath = path;
  }

  // Insert poll and return the inserted row
  const { data: poll, error: pollError } = await supabase
    .from('polls')
    .insert([{ title, image_url: imagePath }])
    .select('id')
    .single();

  if (pollError || !poll?.id) {
    console.error('Error creating poll:', pollError);
    return { ok: false, error: pollError?.message || 'Failed to create poll.' };
  }

  // Insert poll options
  const { error: optionsError } = await supabase.from('poll_options').insert([
    { poll_id: poll.id, option_text: option1 },
    { poll_id: poll.id, option_text: option2 },
  ]);

  if (optionsError) {
    console.error('Error creating poll options:', optionsError);
    return { ok: false, error: optionsError.message };
  }

  // Revalidate list and the new poll page
  revalidatePath('/polls');
  revalidatePath(`/polls/${poll.id}`);

  redirect('/polls');
}

export async function getPolls() {
  const { data, error } = await supabase.from('polls').select(`
    id,
    title,
    image_url,
    created_at,
    poll_options ( id, option_text, votes )
  `);

  if (error) {
    console.error('Error fetching polls:', error);
    return [];
  }

  return data;
}

export async function getPollById(pollId) {
  const { data, error } = await supabase
    .from('polls')
    .select(
      `
      id,
      title,
      image_url,
      created_at,
      poll_options (
        id,
        option_text,
        votes
      )
    `
    )
    .eq('id', pollId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching poll by ID:', error);
    return null;
  }

  return data;
}

export async function votePoll(optionId) {
  if (!optionId) {
    return { success: false, error: 'Option ID is required.' };
  }

  const { data, error } = await supabase.rpc('increment_vote', {
    option_id: optionId,
  });

  if (error) {
    console.error('Error voting:', error);
    return { success: false, error: error.message };
  }

  // Try to revalidate affected paths (list and specific poll page)
  revalidatePath('/polls');

  // Best effort: fetch poll_id for this option to revalidate its page too
  const { data: optionRow, error: fetchOptionError } = await supabase
    .from('poll_options')
    .select('poll_id')
    .eq('id', optionId)
    .single();

  if (!fetchOptionError && optionRow?.poll_id) {
    revalidatePath(`/polls/${optionRow.poll_id}`);
  }

  return { success: true };
}
