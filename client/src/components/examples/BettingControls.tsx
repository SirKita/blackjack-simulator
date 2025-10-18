import { useState } from 'react';
import BettingControls from '../BettingControls';

export default function BettingControlsExample() {
  const [bet, setBet] = useState(0);

  return (
    <div className="p-8 bg-background max-w-md">
      <BettingControls
        balance={100000}
        currentBet={bet}
        onBetChange={setBet}
        onDeal={() => console.log('Deal clicked with bet:', bet)}
      />
    </div>
  );
}
