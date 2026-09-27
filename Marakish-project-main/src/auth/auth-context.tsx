import type { ReactNode } from 'react';
import type { User } from 'firebase/auth';

import { getToken } from 'firebase/messaging';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useState, useEffect, useContext, useCallback, createContext } from 'react';
import {
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { db, auth, googleProvider, messagingPromise } from 'src/firebase';

// ----------------------------------------------------------------------

type AuthContextType = {
  user: User | null;
  loading: boolean;
  role: string | null;
  displayName: string | null;
  photoURL: string | null;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user exists in Firestore
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser(firebaseUser);
          setRole(userData.role || 'Staff');
          setDisplayName(userData.displayName || firebaseUser.displayName);
          setPhotoURL(userData.photoURL || firebaseUser.photoURL || null);
          setError(null);
        } else {
          // User not in whitelist
          await signOut(auth);
          setUser(null);
          setRole(null);
          setDisplayName(null);
          setPhotoURL(null);
          setError('Access denied. User not found in system.');
        }
      } else {
        setUser(null);
        setRole(null);
        setDisplayName(null);
        setPhotoURL(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Request Notification Permission and Get Token
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const messaging = await messagingPromise;
        if (user && messaging) {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const token = await getToken(messaging, {
              vapidKey: 'BHEzfUgrmnmVyFtcGRdTaUE2ECI8LeUF9WWITVbkwD106czCIN4yBgM1XApzypUqWz1KBB4qk_nR-FUR4Nxlj5A',
            });
            if (token) {
              console.log('FCM Token:', token);
              // Store token in user's document
              const userRef = doc(db, 'users', user.uid);
              await updateDoc(userRef, {
                fcmTokens: arrayUnion(token),
              });
            }
          }
        }
      } catch (err) {
        // console.error('An error occurred while retrieving token. ', err);
      }
    };

    requestPermission();
  }, [user]);

  const loginWithGoogle = useCallback(async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      if (firebaseUser) {
        // IMEDIATE verification after popup
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // Critical: If not in Firestore, sign out immediately
          await signOut(auth);
          setError('Access denied. Your account is not authorized in this system.');
          throw new Error('Unauthorized');
        }
      }
    } catch (err: any) {
      console.error('Login Error:', err);
      if (err.message !== 'Unauthorized') {
        setError(err.message);
      }
      throw err;
    }
  }, [setError]);

  const loginWithEmail = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;

      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await signOut(auth);
          setError('Access denied. Your account is not authorized in this system.');
          throw new Error('Unauthorized');
        }
      }
    } catch (err: any) {
      console.error('Login Error:', err);
      if (err.message !== 'Unauthorized') {
        setError(err.message);
      }
      throw err;
    }
  }, [setError]);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        role,
        displayName,
        photoURL,
        error,
        loginWithGoogle,
        loginWithEmail,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
