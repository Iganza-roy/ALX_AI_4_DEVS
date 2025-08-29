import React from 'react';
import { usePolls } from '../../hooks/usePolls';
import PollCard from './PollCard';

const PollList = () => {
    const { polls, isLoading, error } = usePolls();

    if (isLoading) {
        return <div>Loading polls...</div>;
    }

    if (error) {
        return <div>Error loading polls: {error.message}</div>;
    }

    return (
        <div className="poll-list">
            {polls.length === 0 ? (
                <div>No polls available.</div>
            ) : (
                polls.map(poll => (
                    <PollCard key={poll.id} poll={poll} />
                ))
            )}
        </div>
    );
};

export default PollList;