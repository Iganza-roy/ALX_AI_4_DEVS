'use client';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { signUp, signIn } from '../lib/actions';

export default function AuthForm({ type }) {
  return (
    <form
      action={type === 'login' ? signIn : signUp}
      className='flex flex-col space-y-4'
    >
      <Input type='email' placeholder='Email' name='email' required />
      <Input type='password' placeholder='Password' name='password' required />
      <Button type='submit'>{type === 'login' ? 'Login' : 'Register'}</Button>
    </form>
  );
}
