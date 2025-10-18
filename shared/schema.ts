import { z } from "zod";

export const avatarCustomizationSchema = z.object({
  hairColor: z.enum(['black', 'brown', 'blonde', 'red', 'gray', 'blue', 'green', 'purple']),
  eyeColor: z.enum(['brown', 'blue', 'green', 'hazel', 'gray', 'amber']),
  noseSize: z.enum(['small', 'medium', 'large']),
  mouthType: z.enum(['smile', 'neutral', 'frown', 'smirk', 'grin']),
  facialHair: z.enum(['none', 'beard', 'mustache', 'goatee']),
  gender: z.enum(['male', 'female']),
});

export type AvatarCustomization = z.infer<typeof avatarCustomizationSchema>;

export const cardSuitSchema = z.enum(['hearts', 'diamonds', 'clubs', 'spades']);
export const cardRankSchema = z.enum(['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']);

export const cardSchema = z.object({
  suit: cardSuitSchema,
  rank: cardRankSchema,
  faceUp: z.boolean(),
});

export type Card = z.infer<typeof cardSchema>;
export type CardSuit = z.infer<typeof cardSuitSchema>;
export type CardRank = z.infer<typeof cardRankSchema>;

export const gameStateSchema = z.enum(['betting', 'playing', 'dealer-turn', 'game-over']);
export type GameState = z.infer<typeof gameStateSchema>;

export const handResultSchema = z.enum(['win', 'loss', 'push', 'blackjack']);
export type HandResult = z.infer<typeof handResultSchema>;
