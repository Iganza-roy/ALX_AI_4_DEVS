import { getPollById } from '@/lib/actions';
import PollDetail from '@/components/PollDetail';
import { notFound } from 'next/navigation';

export default async function PollDetailPage({ params }) {
  const pollId = params.pollId;
  const poll = await getPollById(pollId);

  if (!poll) {
    notFound();
  }

  return <PollDetail initialPoll={poll} />;
}
