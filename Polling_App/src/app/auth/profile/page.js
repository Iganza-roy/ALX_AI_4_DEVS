import { getUser, signOut } from '../../../../src/lib/auth';
import { redirect } from 'next/navigation';
import { Button } from '../../../../src/components/ui/button';

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <h1 className='text-2xl font-bold mb-4'>User Profile</h1>
      <p className='text-lg mb-2'>Welcome, {user.email}!</p>
      <form action={signOut}>
        <Button type='submit'>Sign Out</Button>
      </form>
    </div>
  );
}
