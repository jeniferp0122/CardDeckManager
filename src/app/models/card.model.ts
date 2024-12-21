export interface Card {
    suit: string;
    rank: string;
    image: string
  }
  
  export interface Deck {
    cards: Card[];
  }
  export interface FirestoreDeck {
    cards: Card[];
  }