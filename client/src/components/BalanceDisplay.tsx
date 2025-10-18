import { TrendingUp, TrendingDown } from "lucide-react";

interface BalanceDisplayProps {
  balance: number;
  className?: string;
}

export default function BalanceDisplay({ balance, className = "" }: BalanceDisplayProps) {
  const isProfit = balance >= 100000;
  const difference = balance - 100000;

  return (
    <div className={`bg-card border border-card-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Balance</p>
          <p className={`text-3xl font-orbitron font-bold ${
            balance >= 100000 ? 'text-chart-4' : 'text-destructive'
          }`} data-testid="text-balance">
            ${balance.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <div className={`flex items-center gap-1 ${
            isProfit ? 'text-chart-4' : 'text-destructive'
          }`}>
            {isProfit ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span className="font-orbitron font-semibold">
              {isProfit ? '+' : ''}{difference.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            vs. $100,000 start
          </p>
        </div>
      </div>
    </div>
  );
}
