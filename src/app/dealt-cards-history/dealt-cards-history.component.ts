import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FirebaseService } from '../services/firebase.service';
import { Card } from '../models/card.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dealt-cards-history',
  standalone: true,
  // Add MatDialogModule to the imports array
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './dealt-cards-history.component.html',
  styleUrls: ['./dealt-cards-history.component.scss'],
})
export class DealtCardsHistoryComponent {
  constructor(
    public dialogRef: MatDialogRef<DealtCardsHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cards: Card[] },
    private firebaseService: FirebaseService
  ) {}

  close() {
    this.dialogRef.close();
  }

  async clearHistory() {
    try {
      await this.firebaseService.clearDealtCardsHistory();
      this.data.cards.length = 0;
      alert('History cleared successfully!');
    } catch (error) {
      console.error('Error clearing history:', error);
      alert('Failed to clear the history.');
    }
  }
}




