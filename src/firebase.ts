import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import { type FirebaseOptions } from 'firebase/app';
import type { CustomEventName } from 'firebase/analytics';

import env from './env';

const PageView = 'page_view' as CustomEventName<'page_view'>

const firebaseConfig: FirebaseOptions = {
  apiKey: env.VITE_API_KEY,
  authDomain: env.VITE_AUTH_DOMAIN,
  projectId: env.VITE_PROJECT_ID,
  storageBucket: env.VITE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
  appId: env.VITE_APP_ID,
  measurementId: env.VITE_MEASUREMENT_ID
};

for (const key in firebaseConfig) {
  if (!firebaseConfig[key as keyof FirebaseOptions]) {
    throw new Error(`Missing firebase config value for ${key}, check .env file`);
  }
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();

export { firebaseApp, analytics, PageView };
