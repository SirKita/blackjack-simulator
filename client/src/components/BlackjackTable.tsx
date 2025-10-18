import { Card } from "@shared/schema";
import PlayingCard from "./PlayingCard";

interface BlackjackTableProps {
  dealerHand: Card[];
  playerHand: Card[];
  dealerScore: number;
  playerScore: number;
  gameState: 'betting' | 'playing' | 'dealer-turn' | 'game-over';
  result?: 'win' | 'loss' | 'push' | 'blackjack' | null;
}

export default function BlackjackTable({
  dealerHand,
  playerHand,
  dealerScore,
  playerScore,
  gameState,
  result
}: BlackjackTableProps) {
  return (
    <div className="relative h-full flex flex-col justify-between p-6 bg-gradient-to-br from-primary to-primary/80 rounded-lg border-4 border-primary-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-primary-foreground">Dealer</h3>
          {gameState !== 'betting' && (
            <div className="text-lg font-orbitron font-bold text-primary-foreground">
              {gameState === 'playing' && dealerHand.length > 0 && !dealerHand[1]?.faceUp ? '?' : dealerScore}
            </div>
          )}
        </div>
        <div className="flex gap-2 justify-center min-h-[120px] items-center">
          {dealerHand.length > 0 ? (
            dealerHand.map((card, i) => (
              <PlayingCard key={i} card={card} className="transform hover:scale-105 transition-transform" />
            ))
          ) : (
            <div className="text-primary-foreground/50 text-sm">Waiting for bets...</div>
          )}
        </div>
      </div>

      {result && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
          <div className="bg-card border-2 border-card-border rounded-lg p-8 text-center shadow-xl">
            <h2 className={`text-4xl font-bold mb-2 ${
              result === 'win' || result === 'blackjack' ? 'text-chart-4' : 
              result === 'loss' ? 'text-destructive' : 'text-foreground'
            }`} data-testid="text-result">
              {result === 'win' && 'You Win!'}
              {result === 'loss' && 'Dealer Wins'}
              {result === 'push' && 'Push'}
              {result === 'blackjack' && 'BLACKJACK!'}
            </h2>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex gap-2 justify-center min-h-[120px] items-center">
          {playerHand.length > 0 ? (
            playerHand.map((card, i) => (
              <PlayingCard key={i} card={card} className="transform hover:scale-105 transition-transform" />
            ))
          ) : (
            <div className="text-primary-foreground/50 text-sm">Place your bet to start</div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-primary-foreground">You</h3>
          {gameState !== 'betting' && playerHand.length > 0 && (
            <div className={`text-lg font-orbitron font-bold ${
              playerScore > 21 ? 'text-destructive' : 'text-primary-foreground'
            }`}>
              {playerScore}
              {playerScore > 21 && ' (BUST)'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
