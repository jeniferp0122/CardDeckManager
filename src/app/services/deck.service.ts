import { Injectable } from '@angular/core';
import { Card, Deck } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private suits = [
    { code: 'c', name: 'Clubs' },
    { code: 'd', name: 'Diamonds' },
    { code: 'h', name: 'Hearts' },
    { code: 's', name: 'Spades' },
  ];
  private ranks = [
    { code: '2', name: '2' },
    { code: '3', name: '3' },
    { code: '4', name: '4' },
    { code: '5', name: '5' },
    { code: '6', name: '6' },
    { code: '7', name: '7' },
    { code: '8', name: '8' },
    { code: '9', name: '9' },
    { code: '10', name: '10' },
    { code: 'j', name: 'J' },
    { code: 'q', name: 'Q' },
    { code: 'k', name: 'K' },
    { code: 'a', name: 'A' },
  ];

  createDeck(): Deck {
    const cards: Card[] = [];
    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        const image = `assets/cards/simple_${suit.code}_${rank.code}.svg`;
        cards.push({ suit: suit.name, rank: rank.name, image });
      }
    }
    return { cards };
  }

  shuffleDeck(deck: Deck): Deck {
    const shuffled = [...deck.cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return { cards: shuffled };
  }

  dealCards(deck: Deck, count: number): Card[] {
    if (deck.cards.length < count) {
      throw new Error('Not enough cards left in the deck');
    }
    return deck.cards.splice(0, count);
  }
}
