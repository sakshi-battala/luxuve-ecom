import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { firebaseConfig } from './firebase.config';
import { provideHttpClient } from '@angular/common/http';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // connects firebase to angular
    provideFirebaseApp(() => initializeApp(firebaseConfig)),

    // firebase provides the auth service
    provideAuth(() => getAuth()),

    provideHttpClient(),

    provideFirestore(() => getFirestore()),
  ],
};
