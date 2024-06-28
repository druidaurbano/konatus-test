export interface Card {
  image: string;
  value: string;
  suit: string;
  code: string;
}

export interface DeckOfCardsResponse {
  success: boolean;
  deck_id: string;
  cards: Card[];
  remaining: number;
}
