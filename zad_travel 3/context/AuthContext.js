
import React, { createContext, useState, useEffect } from 'react';
import {
  initializeApp
} from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBGGgQBXjLDE5i90P1y0o4ocskb5xWGLZE",
  authDomain: "travels-2775f.firebaseapp.com",
  databaseURL: "https://travels-2775f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "travels-2775f",
  storageBucket: "travels-2775f.appspot.com",
  messagingSenderId: "406552460399",
  appId: "1:406552460399:web:ef57b892010585f028219a"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const signOutUser = () => firebaseSignOut(auth);

  return (
    <AuthContext.Provider value={{ user, isLoading, signInUser, registerUser, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
