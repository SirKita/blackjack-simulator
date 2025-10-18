import { useState, useEffect } from "react";
import { AvatarCustomization, Card, GameState } from "@shared/schema";
import AvatarCreation from "@/components/AvatarCreation";
import Avatar from "@/components/Avatar";
import BlackjackTable from "@/components/BlackjackTable";
import BettingControls from "@/components/BettingControls";
import GameControls from "@/components/GameControls";
import BalanceDisplay from "@/components/BalanceDisplay";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function Home() {
  const [avatarCustomization, setAvatarCustomization] = useState<AvatarCustomization | null>(null);
  const [balance, setBalance] = useState(100000);
  const [currentBet, setCurrentBet] = useState(0);
  const [gameState, setGameState] = useState<GameState>('betting');
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [result, setResult] = useState<'win' | 'loss' | 'push' | 'blackjack' | null>(null);

  const createDeck = (): Card[] => {
    const suits: Card['suit'][] = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks: Card['rank'][] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck: Card[] = [];
    
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({ suit, rank, faceUp: true });
      }
    }
    
    return deck.sort(() => Math.random() - 0.5);
  };

  const [deck, setDeck] = useState<Card[]>(createDeck());

  const getCardValue = (card: Card): number => {
    if (card.rank === 'A') return 11;
    if (['K', 'Q', 'J'].includes(card.rank)) return 10;
    return parseInt(card.rank);
  };

  const calculateScore = (hand: Card[]): number => {
    let score = 0;
    let aces = 0;

    for (const card of hand) {
      if (card.faceUp) {
        const value = getCardValue(card);
        score += value;
        if (card.rank === 'A') aces++;
      }
    }

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  };

  const dealCard = (hand: Card[], faceUp = true): Card[] => {
    if (deck.length === 0) {
      setDeck(createDeck());
      return hand;
    }
    const card = { ...deck[0], faceUp };
    setDeck(deck.slice(1));
    return [...hand, card];
  };

  const handleDeal = () => {
    if (currentBet === 0 || currentBet > balance) return;

    setBalance(balance - currentBet);
    setResult(null);
    
    let newDeck = [...deck];
    if (newDeck.length < 20) {
      newDeck = createDeck();
      setDeck(newDeck);
    }

    const playerCards = [
      { ...newDeck[0], faceUp: true },
      { ...newDeck[1], faceUp: true }
    ];
    const dealerCards = [
      { ...newDeck[2], faceUp: true },
      { ...newDeck[3], faceUp: false }
    ];

    setDeck(newDeck.slice(4));
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setGameState('playing');

    const playerScore = calculateScore(playerCards);
    if (playerScore === 21) {
      setTimeout(() => handleStand(playerCards, dealerCards), 500);
    }
  };

  const handleHit = () => {
    const newHand = dealCard(playerHand);
    setPlayerHand(newHand);
    
    const score = calculateScore(newHand);
    if (score > 21) {
      setTimeout(() => {
        setResult('loss');
        setGameState('game-over');
      }, 500);
    } else if (score === 21) {
      setTimeout(() => handleStand(newHand, dealerHand), 500);
    }
  };

  const handleStand = (pHand = playerHand, dHand = dealerHand) => {
    setGameState('dealer-turn');
    
    let newDealerHand = dHand.map(c => ({ ...c, faceUp: true }));
    setDealerHand(newDealerHand);

    setTimeout(() => {
      let dealerScore = calculateScore(newDealerHand);
      const playerScore = calculateScore(pHand);

      while (dealerScore < 17) {
        const card = deck[0];
        if (!card) break;
        newDealerHand = [...newDealerHand, { ...card, faceUp: true }];
        setDealerHand(newDealerHand);
        setDeck(deck.slice(1));
        dealerScore = calculateScore(newDealerHand);
      }

      setTimeout(() => {
        let gameResult: 'win' | 'loss' | 'push' | 'blackjack';
        
        if (playerScore === 21 && pHand.length === 2) {
          gameResult = 'blackjack';
          setBalance(b => b + currentBet * 2.5);
        } else if (playerScore > 21) {
          gameResult = 'loss';
        } else if (dealerScore > 21) {
          gameResult = 'win';
          setBalance(b => b + currentBet * 2);
        } else if (playerScore > dealerScore) {
          gameResult = 'win';
          setBalance(b => b + currentBet * 2);
        } else if (dealerScore > playerScore) {
          gameResult = 'loss';
        } else {
          gameResult = 'push';
          setBalance(b => b + currentBet);
        }

        setResult(gameResult);
        setGameState('game-over');
      }, 1000);
    }, 1000);
  };

  const handleNewRound = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setCurrentBet(0);
    setResult(null);
    setGameState('betting');
  };

  const handleNewAvatar = () => {
    setAvatarCustomization(null);
    setBalance(100000);
    setCurrentBet(0);
    setPlayerHand([]);
    setDealerHand([]);
    setResult(null);
    setGameState('betting');
  };

  if (!avatarCustomization) {
    return <AvatarCreation onComplete={setAvatarCustomization} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-2/3 p-6 flex flex-col">
        <BlackjackTable
          dealerHand={dealerHand}
          playerHand={playerHand}
          dealerScore={calculateScore(dealerHand)}
          playerScore={calculateScore(playerHand)}
          gameState={gameState}
          result={result}
        />
        
        <div className="mt-6">
          {gameState === 'betting' ? (
            <BettingControls
              balance={balance}
              currentBet={currentBet}
              onBetChange={setCurrentBet}
              onDeal={handleDeal}
            />
          ) : gameState === 'playing' ? (
            <GameControls
              onHit={handleHit}
              onStand={() => handleStand()}
              canDouble={playerHand.length === 2 && currentBet * 2 <= balance}
              canSplit={false}
            />
          ) : (
            <Button
              onClick={handleNewRound}
              className="w-full"
              size="lg"
              data-testid="button-new-round"
            >
              New Round
            </Button>
          )}
        </div>
      </div>

      <div className="w-1/3 bg-card border-l border-card-border p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Your Character</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewAvatar}
            data-testid="button-new-avatar"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Avatar
          </Button>
        </div>

        <BalanceDisplay balance={balance} />

        <div className="flex-1 flex items-center justify-center">
          <Avatar customization={avatarCustomization} balance={balance} />
        </div>
      </div>
    </div>
  );
}
