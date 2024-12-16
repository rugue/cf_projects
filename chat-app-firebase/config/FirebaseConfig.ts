import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjExb11PbFRyLcRewAqCxWSuN4GbMN88o",
  authDomain: "reactnative-apps-e5c0b.firebaseapp.com",
  projectId: "reactnative-apps-e5c0b",
  storageBucket: "reactnative-apps-e5c0b.firebasestorage.app",
  messagingSenderId: "139620135146",
  appId: "1:139620135146:web:421f48d59eda8acfdf2793",
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { FIREBASE_APP, FIREBASE_DB, FIREBASE_AUTH };
