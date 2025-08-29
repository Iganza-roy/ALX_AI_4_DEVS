import { Card } from '../ui/card';
import { Button } from '../ui/button';

const PollCard = ({ poll, onVote }) => {
    return (
        <Card>
            <h2>{poll.title}</h2>
            <p>{poll.description}</p>
            <Button onClick={() => onVote(poll.id)}>Vote</Button>
        </Card>
    );
};

export default PollCard;