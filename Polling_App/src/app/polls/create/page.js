import PollForm from '../../../components/PollForm';
import { createPoll } from '../../../lib/actions';

export default function CreatePollPage() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Create New Poll</h1>
      <PollForm action={createPoll} />
    </div>
  );
}
