'use server';

import { redirect } from 'next/navigation';
import { supabase } from './supabase';

export async function createPoll(formData) {
  const title = formData.get('title');
  const option1 = formData.get('option1');
  const option2 = formData.get('option2');
  const image = formData.get('image');

  // Handle image upload if an image is provided
  let imageUrl = null;
  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `poll_images/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('poll-images') // Replace with your bucket name
      .upload(filePath, image, { upsert: false });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      // Handle error, maybe return early or throw
    }
    imageUrl = uploadData.path;
  }

  // Insert poll data into Supabase
  const { data, error } = await supabase
    .from('polls')
    .insert([{ title, image_url: imageUrl }])
    .select();

  if (error || !data || data.length === 0) {
    console.error('Error creating poll or no data returned:', error);
    // You might want to throw an error or return a specific error object here
    // For now, let's just return to prevent further execution and indicate failure.
    return { error: error?.message || 'Failed to create poll.' };
  }

  const pollId = data[0].id;

  // Insert poll options
  const { error: optionsError } = await supabase.from('poll_options').insert([
    { poll_id: pollId, option_text: option1 },
    { poll_id: pollId, option_text: option2 },
  ]);

  if (optionsError) {
    console.error('Error creating poll options:', optionsError);
    // Handle error, maybe return early or throw
    // You might also consider rolling back the poll creation if options fail
    return { error: optionsError.message };
  }

  redirect(`/polls/${pollId}`);
}

export async function getPolls() {
  'use server';

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
  'use server';

  const { data, error } = await supabase
    .from('polls')
    .select(
      `
      id,
      title,
      image_url,
      created_at,
      poll_options ( id, option_text, votes )
    `
    )
    .eq('id', pollId)
    .single();

  if (error) {
    console.error('Error fetching poll by ID:', error);
    return null;
  }

  return data;
}

export async function votePoll(optionId) {
  'use server';

  const { data, error } = await supabase.rpc('increment_vote', {
    option_id: optionId,
  });

  if (error) {
    console.error('Error voting:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
