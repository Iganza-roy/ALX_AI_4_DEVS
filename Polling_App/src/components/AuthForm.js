import { Input } from './ui/input';
import { Button } from './ui/button';
import { signUp, signIn } from '../lib/auth';

export default function AuthForm({ type }) {
  const handleSubmit = async (formData) => {
    if (type === 'login') {
      const { error } = await signIn(formData);
      if (error) {
        alert(error);
      }
    } else {
      const { error } = await signUp(formData);
      if (error) {
        alert(error);
      }
    }
  };

  return (
    <form action={handleSubmit} className='flex flex-col space-y-4'>
      <Input type='email' placeholder='Email' name='email' required />
      <Input type='password' placeholder='Password' name='password' required />
      <Button type='submit'>{type === 'login' ? 'Login' : 'Register'}</Button>
    </form>
  );
}
