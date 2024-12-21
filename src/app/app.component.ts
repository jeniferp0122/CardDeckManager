import { Component } from '@angular/core';
import { DeckService } from './services/deck.service';
import { FirebaseService } from './services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { Card } from './models/card.model';
import { DealtCardsHistoryComponent } from './dealt-cards-history/dealt-cards-history.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
})
export class AppComponent {
  title = 'Card Deck Manager';
  dealtCards: Card[] = [];
  deck!: ReturnType<DeckService['createDeck']>;

  constructor(
    private deckService: DeckService,
    private firebaseService: FirebaseService,
    private dialog: MatDialog
  ) {
    this.initializeDeck();
  }

  async initializeDeck() {
    try {
      const savedDeck = await this.firebaseService.fetchDeckState();
      if (savedDeck) {
        this.deck = savedDeck; // Restore saved deck state
      } else {
        this.deck = this.deckService.createDeck(); // Create a new deck
        this.saveDeckState();
      }
    } catch (error) {
      console.error('Error initializing deck:', error);
      this.deck = this.deckService.createDeck(); // Fallback to a new deck
    }
  }

  shuffleDeck() {
    this.deck = this.deckService.shuffleDeck(this.deck);
    this.dealtCards = [];
    this.saveDeckState();
  }

  async dealCards() {
    try {
      this.dealtCards = this.deckService.dealCards(this.deck, 5);
      await this.firebaseService.saveDealtCards({ cards: this.dealtCards });
      this.saveDeckState();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  }

  resetDeck() {
    this.deck = this.deckService.createDeck();
    this.dealtCards = [];
    this.saveDeckState();
  }

  saveDeckState() {
    this.firebaseService.saveDeckState(this.deck).catch((error) => {
      console.error('Error saving deck state:', error);
    });
  }

  async viewDealtCardsHistory() {
    try {
      const history = await this.firebaseService.fetchDealtCardsHistory();
      this.dialog.open(DealtCardsHistoryComponent, {
        data: { cards: history },
        width: '600px', // Wider dialog for better layout
        disableClose: false, // Allow closing by clicking outside
        autoFocus: true, // Automatically focus the first element
      });
    } catch (error) {
      console.error('Error fetching dealt cards history:', error);
      alert('Failed to load dealt cards history.');
    }
  }
}
