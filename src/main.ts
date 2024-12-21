import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import { getApps } from 'firebase/app';
import { MatDialogModule } from '@angular/material/dialog';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // Initialize Firebase with the config from your environment file
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),

    // Import Material Dialog Module
    importProvidersFrom(MatDialogModule),
  ],
})
  .then(() => {
    // Log Firebase initialization
    console.log('Initialized Firebase Apps:', getApps()); // Logs the initialized Firebase apps
  })
  .catch((err) => console.error('Error bootstrapping the application:', err));
