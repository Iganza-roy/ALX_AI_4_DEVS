import Image from 'next/image';
import { Button } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './ui/card';
import { Progress } from './ui/progress';
import { votePoll } from '../lib/actions';

export default function PollDetail({ poll }) {
  if (!poll) {
    return (
      <div className='text-center py-8 text-gray-500'>Poll not found.</div>
    );
  }

  const totalVotes = poll.poll_options.reduce(
    (sum, option) => sum + (option.votes || 0),
    0
  );

  const handleVote = async (optionId) => {
    await votePoll(optionId);
    // Potentially revalidate path or refresh data here if not handled by Next.js automatically
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      {poll.image_url && (
        <div className='relative h-64 w-full'>
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/poll-images/${poll.image_url}`}
            alt={poll.title}
            fill
            style={{ objectFit: 'cover' }}
            className='rounded-t-lg'
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className='text-3xl font-bold text-center'>
          {poll.title}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {poll.poll_options.map((option) => (
          <div key={option.id} className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='text-lg font-medium'>{option.option_text}</span>
              <span className='text-gray-600'>{option.votes || 0} votes</span>
            </div>
            <Progress
              value={
                totalVotes === 0 ? 0 : ((option.votes || 0) / totalVotes) * 100
              }
              className='w-full'
            />
            <form action={() => handleVote(option.id)}>
              <Button type='submit' className='w-full mt-2'>
                Vote
              </Button>
            </form>
          </div>
        ))}
      </CardContent>
      <CardFooter className='text-sm text-gray-500 justify-center'>
        Created: {new Date(poll.created_at).toLocaleDateString()}
      </CardFooter>
    </Card>
  );
}
