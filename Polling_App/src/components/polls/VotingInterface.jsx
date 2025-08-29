import React from 'react';

const VotingInterface = ({ poll, onVote }) => {
    const handleVote = (optionId) => {
        onVote(optionId);
    };

    return (
        <div className="voting-interface">
            <h2>{poll.title}</h2>
            <p>{poll.description}</p>
            <div className="options">
                {poll.options.map((option) => (
                    <div key={option.id} className="option">
                        <button onClick={() => handleVote(option.id)}>
                            {option.text}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VotingInterface;