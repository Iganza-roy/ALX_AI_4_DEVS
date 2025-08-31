'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function AuthForm({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error } =
      type === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      router.push('/polls');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleAuth} className='flex flex-col space-y-4'>
      <Input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type='submit' disabled={loading}>
        {loading ? 'Loading...' : type === 'login' ? 'Login' : 'Register'}
      </Button>
    </form>
  );
}
