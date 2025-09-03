import Link from 'next/link';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-8 text-center dark:from-gray-900 dark:to-gray-800'>
      <div className='space-y-6'>
        <h1 className='text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50'>
          Welcome to Your Polling App
        </h1>
        <p className='mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300'>
          Create, share, and vote on polls instantly. See real-time results and
          engage with your audience like never before.
        </p>
        <div className='flex justify-center gap-4'>
          <Button asChild size='lg'>
            <Link href='/polls/create'>Create a New Poll</Link>
          </Button>
          <Button asChild size='lg' variant='outline'>
            <Link href='/polls'>View All Polls</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
