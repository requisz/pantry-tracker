// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX811ba6-9YmK3syk6WyR-MFTPo-20zfg",
  authDomain: "pantry-tracker-dabcd.firebaseapp.com",
  projectId: "pantry-tracker-dabcd",
  storageBucket: "pantry-tracker-dabcd.appspot.com",
  messagingSenderId: "568461064050",
  appId: "1:568461064050:web:01d7717f1f1e65b4dc4feb",
  measurementId: "G-VLG0KBQ9E9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
