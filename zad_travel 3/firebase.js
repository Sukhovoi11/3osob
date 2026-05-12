// firebase.js
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Twój obiekt konfiguracyjny
const firebaseConfig = {
  apiKey: "AIzaSyBGGgQBXjLDE5i90P1y0o4ocskb5xWGLZE",
  authDomain: "travels-2775f.firebaseapp.com",
  databaseURL: "https://travels-2775f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "travels-2775f",
  storageBucket: "travels-2775f.appspot.com",
  messagingSenderId: "406552460399",
  appId: "1:406552460399:web:ef57b892010585f028219a"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);

// Inicjalizacja autoryzacji z AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicjalizacja Firestore
const db = getFirestore(app);

// Eksport
export { auth, db };
