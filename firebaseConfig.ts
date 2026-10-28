// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6Z5j5hBU-YLw69GLioA8bX6NFtwRv0F8",
  authDomain: "faketube-2b672.firebaseapp.com",
  projectId: "faketube-2b672",
  storageBucket: "faketube-2b672.firebasestorage.app",
  messagingSenderId: "20260574493",
  appId: "1:20260574493:web:37789f4b4bcf371870bdf4",
  measurementId: "G-Z3J8XZ0MG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);