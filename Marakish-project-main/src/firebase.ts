import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { onMessage, isSupported, getMessaging } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyB1gEfYoE9FgbE3wOrJGoPf4bONi9VoM6k',
  authDomain: 'marakishshj.firebaseapp.com',
  projectId: 'marakishshj',
  storageBucket: 'marakishshj.firebasestorage.app',
  messagingSenderId: '586344993025',
  appId: '1:586344993025:web:ac6cf5c2e0044417fc4b00',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const messagingPromise = (async () => {
  if (typeof window === 'undefined') return null;
  try {
    const supported = await isSupported();
    if (supported) {
      return getMessaging(app);
    }
  } catch (err) {
    console.warn('Firebase Messaging not supported:', err);
  }
  return null;
})();

export { onMessage };
export const googleProvider = new GoogleAuthProvider();
