// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKHNQ-0QSvkE5hKk4nkDC-4XVm-2LB-oY",
  authDomain: "workfit-4d01d.firebaseapp.com",
  projectId: "workfit-4d01d",
  storageBucket: "workfit-4d01d.appspot.com",
  messagingSenderId: "154731668479",
  appId: "1:154731668479:web:04eaa3ce4c48c9a81dbdca",
  measurementId: "G-LZC1M5TKBL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const database = getDatabase(app);
export { auth, database };
