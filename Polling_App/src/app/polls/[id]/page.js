import VotingInterface from '@/components/polls/VotingInterface';

const PollPage = ({ params }) => {
    const { id } = params;

    return (
        <div>
            <h1>Poll Details</h1>
            <VotingInterface pollId={id} />
        </div>
    );
};

export default PollPage;