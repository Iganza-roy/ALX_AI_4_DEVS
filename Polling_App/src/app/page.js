import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <h1 className='text-4xl font-bold'>Welcome to the Polling App!</h1>
      </div>

      <div className='flex gap-4'>
        <Link
          href='/polls/create'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Create a New Poll
        </Link>
        <Link
          href='/polls'
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          View All Polls
        </Link>
      </div>
    </main>
  );
}
