"use server"

import PollDetail from '../../../../src/components/PollDetail';
import { getPollById } from '../../../../src/lib/actions';

export default async function PollDetailPage({ params }) {
  const { pollId } = params;
  const poll = await getPollById(pollId);

  return (
    <div className='container mx-auto p-4'>
      <PollDetail poll={poll} />
    </div>
  );
}
