import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, deleteDoc, addDoc, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Deck, Card } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  async saveDeckState(deck: Deck): Promise<void> {
    const deckRef = doc(this.firestore, 'deck/state');
    await setDoc(deckRef, { cards: deck.cards });
    console.log('Deck state saved successfully!');
  }

  async fetchDeckState(): Promise<Deck | null> {
    const deckRef = doc(this.firestore, 'deck/state');
    const docSnap = await getDoc(deckRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as { cards: Card[] };
      return { cards: data.cards };
    }
    return null;
  }

  async saveDealtCards(dealtCards: Deck): Promise<void> {
    const historyCollectionRef = collection(this.firestore, 'deck', 'state', 'history'); // Subcollection under "deck/state"
    await addDoc(historyCollectionRef, { cards: dealtCards.cards });
    console.log('Dealt cards saved successfully!');
  }

  async fetchDealtCardsHistory(): Promise<Card[]> {
    const historyRef = collection(this.firestore, 'deck', 'state', 'history'); // Subcollection under "deck/state"
    const querySnapshot = await getDocs(historyRef);
    const history: Card[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as { cards: Card[] };
      history.push(...data.cards);
    });
    return history;
  }

  async clearDealtCardsHistory(): Promise<void> {
    const historyRef = collection(this.firestore, 'deck', 'state', 'history'); // Correct path to history subcollection
    const querySnapshot = await getDocs(historyRef);

    const deletePromises = querySnapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises); // Wait for all deletions to complete
    console.log('History cleared successfully!');
  }
}



