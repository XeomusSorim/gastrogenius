import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'g4str0g3nius',
        appId: '1:969760392748:web:a29ae5e00949ee43447389',
        storageBucket: 'g4str0g3nius.appspot.com',
        apiKey: 'AIzaSyCgXJI45LFQXNhRaj-9BynVMcZ055CkPO0',
        authDomain: 'g4str0g3nius.firebaseapp.com',
        messagingSenderId: '969760392748',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};