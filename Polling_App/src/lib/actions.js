import { redirect } from 'next/navigation';
import { supabase } from './supabase';

export async function createPoll(formData) {
  'use server';

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

  if (error) {
    console.error('Error creating poll:', error);
    // Handle error
  }

  const pollId = data[0].id;

  // Insert poll options
  const { error: optionsError } = await supabase.from('poll_options').insert([
    { poll_id: pollId, option_text: option1 },
    { poll_id: pollId, option_text: option2 },
  ]);

  if (optionsError) {
    console.error('Error creating poll options:', optionsError);
    // Handle error
  }

  redirect(`/polls/${pollId}`);
}
