import { Card as ShadcnCard } from 'shadcn-ui';

const Card = ({ title, description, children }) => {
  return (
    <ShadcnCard>
      <ShadcnCard.Header>
        <h2>{title}</h2>
      </ShadcnCard.Header>
      <ShadcnCard.Body>
        <p>{description}</p>
        {children}
      </ShadcnCard.Body>
    </ShadcnCard>
  );
};

export default Card;