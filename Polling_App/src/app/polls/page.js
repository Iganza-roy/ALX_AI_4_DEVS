import PollList from '../../components/PollList';

export default function PollsPage() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>All Polls</h1>
      <PollList />
    </div>
  );
}
