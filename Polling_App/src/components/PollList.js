import Link from 'next/link';
import { getPolls } from '../lib/actions';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { Button } from './ui/button';

export default async function PollList() {
  const polls = await getPolls();

  if (!polls || polls.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        No polls created yet.
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {polls.map((poll) => (
        <Card key={poll.id} className='flex flex-col'>
          {poll.image_url && (
            <div className='relative h-48 w-full'>
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
            <CardTitle>{poll.title}</CardTitle>
            <CardDescription className='text-sm text-gray-500'>
              Created: {new Date(poll.created_at).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <p className='font-semibold mb-2'>Options:</p>
            <div className='space-y-2'>
              {poll.poll_options.map((option) => (
                <Badge key={option.id} variant='secondary' className='mr-2'>
                  {option.option_text} ({option.votes || 0})
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/polls/${poll.id}`} className='w-full'>
              <Button className='w-full'>View Poll</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
