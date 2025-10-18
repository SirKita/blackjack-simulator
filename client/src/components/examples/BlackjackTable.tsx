import BlackjackTable from '../BlackjackTable';

export default function BlackjackTableExample() {
  return (
    <div className="p-8 bg-background h-[600px]">
      <BlackjackTable
        dealerHand={[
          { suit: 'hearts', rank: 'K', faceUp: true },
          { suit: 'clubs', rank: '7', faceUp: false }
        ]}
        playerHand={[
          { suit: 'diamonds', rank: 'A', faceUp: true },
          { suit: 'spades', rank: '9', faceUp: true }
        ]}
        dealerScore={17}
        playerScore={20}
        gameState="playing"
      />
    </div>
  );
}
