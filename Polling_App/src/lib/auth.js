import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signUp(formData) {
  'use server';

  const email = formData.get('email');
  const password = formData.get('password');

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Sign up error:', error);
    return { error: error.message };
  }

  redirect('/auth/login');
}

export async function signIn(formData) {
  'use server';

  const email = formData.get('email');
  const password = formData.get('password');

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    return { error: error.message };
  }

  redirect('/polls'); // Redirect to polls page after successful login
}

export async function signOut() {
  'use server';

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out error:', error);
    return { error: error.message };
  }

  redirect('/auth/login');
}

export async function getUser() {
  'use server';

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Get user error:', error);
    return null;
  }

  return user;
}
