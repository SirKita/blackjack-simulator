import { Button } from "@/components/ui/button";
import { Hand, CircleStop, Zap, Split } from "lucide-react";

interface GameControlsProps {
  onHit: () => void;
  onStand: () => void;
  onDouble?: () => void;
  onSplit?: () => void;
  canDouble: boolean;
  canSplit: boolean;
  disabled?: boolean;
}

export default function GameControls({ 
  onHit, 
  onStand, 
  onDouble, 
  onSplit,
  canDouble, 
  canSplit,
  disabled = false 
}: GameControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        onClick={onHit}
        disabled={disabled}
        size="lg"
        variant="default"
        className="h-16"
        data-testid="button-hit"
      >
        <Hand className="w-5 h-5 mr-2" />
        Hit
      </Button>
      
      <Button
        onClick={onStand}
        disabled={disabled}
        size="lg"
        variant="destructive"
        className="h-16"
        data-testid="button-stand"
      >
        <CircleStop className="w-5 h-5 mr-2" />
        Stand
      </Button>

      {canDouble && onDouble && (
        <Button
          onClick={onDouble}
          disabled={disabled}
          size="lg"
          variant="secondary"
          className="h-16"
          data-testid="button-double"
        >
          <Zap className="w-5 h-5 mr-2" />
          Double Down
        </Button>
      )}

      {canSplit && onSplit && (
        <Button
          onClick={onSplit}
          disabled={disabled}
          size="lg"
          variant="secondary"
          className="h-16"
          data-testid="button-split"
        >
          <Split className="w-5 h-5 mr-2" />
          Split
        </Button>
      )}
    </div>
  );
}
