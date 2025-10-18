import { Card } from "@shared/schema";
import { Heart, Diamond, Club, Spade } from "lucide-react";

interface PlayingCardProps {
  card: Card;
  className?: string;
}

export default function PlayingCard({ card, className = "" }: PlayingCardProps) {
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  
  const SuitIcon = {
    hearts: Heart,
    diamonds: Diamond,
    clubs: Club,
    spades: Spade,
  }[card.suit];

  if (!card.faceUp) {
    return (
      <div className={`relative w-20 h-28 rounded-lg shadow-lg ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-lg border-2 border-red-900">
          <div className="absolute inset-2 grid grid-cols-3 grid-rows-4 gap-1">
            {[...Array(12)].map((_, i) => (
              <Diamond key={i} className="w-full h-full text-white opacity-30" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-20 h-28 bg-white rounded-lg shadow-lg border border-gray-300 ${className}`}>
      <div className="absolute top-1 left-1.5 flex flex-col items-center">
        <span className={`text-xl font-bold leading-none ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
          {card.rank}
        </span>
        <SuitIcon className={`w-4 h-4 ${isRed ? 'text-red-600' : 'text-gray-900'}`} fill="currentColor" />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <SuitIcon className={`w-12 h-12 ${isRed ? 'text-red-600' : 'text-gray-900'}`} fill="currentColor" />
      </div>
      
      <div className="absolute bottom-1 right-1.5 flex flex-col items-center rotate-180">
        <span className={`text-xl font-bold leading-none ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
          {card.rank}
        </span>
        <SuitIcon className={`w-4 h-4 ${isRed ? 'text-red-600' : 'text-gray-900'}`} fill="currentColor" />
      </div>
    </div>
  );
}
