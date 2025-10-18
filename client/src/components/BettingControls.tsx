import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";

interface BettingControlsProps {
  balance: number;
  currentBet: number;
  onBetChange: (amount: number) => void;
  onDeal: () => void;
  disabled?: boolean;
}

export default function BettingControls({ balance, currentBet, onBetChange, onDeal, disabled = false }: BettingControlsProps) {
  const chipValues = [5, 25, 100, 500, 1000, 5000];

  const addBet = (amount: number) => {
    if (currentBet + amount <= balance) {
      onBetChange(currentBet + amount);
    }
  };

  const clearBet = () => {
    onBetChange(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">Current Bet</p>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-chart-2" />
            <span className="text-2xl font-orbitron font-bold text-foreground">
              ${currentBet.toLocaleString()}
            </span>
          </div>
        </div>
        <Button 
          onClick={clearBet} 
          variant="outline" 
          size="sm"
          disabled={disabled || currentBet === 0}
          data-testid="button-clear-bet"
        >
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {chipValues.map(value => (
          <Button
            key={value}
            onClick={() => addBet(value)}
            variant="secondary"
            className="relative h-auto py-3"
            disabled={disabled || currentBet + value > balance}
            data-testid={`button-chip-${value}`}
          >
            <div className="flex flex-col items-center gap-1">
              <Badge variant="outline" className="bg-chart-2 text-gray-900 border-chart-2">
                ${value}
              </Badge>
            </div>
          </Button>
        ))}
      </div>

      <Button
        onClick={onDeal}
        disabled={disabled || currentBet === 0}
        className="w-full"
        size="lg"
        data-testid="button-deal"
      >
        Deal Cards
      </Button>
    </div>
  );
}
