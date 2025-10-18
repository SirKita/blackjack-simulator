import PlayingCard from '../PlayingCard';

export default function PlayingCardExample() {
  return (
    <div className="flex gap-4 p-8 bg-background">
      <PlayingCard card={{ suit: 'hearts', rank: 'A', faceUp: true }} />
      <PlayingCard card={{ suit: 'spades', rank: 'K', faceUp: true }} />
      <PlayingCard card={{ suit: 'diamonds', rank: '10', faceUp: true }} />
      <PlayingCard card={{ suit: 'clubs', rank: '7', faceUp: false }} />
    </div>
  );
}
