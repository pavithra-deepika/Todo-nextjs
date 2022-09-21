// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTDzFGjRWScJCcyBxYyrHxfgpiS3PgyGQ",
  authDomain: "todo--nextjs.firebaseapp.com",
  projectId: "todo--nextjs",
  storageBucket: "todo--nextjs.appspot.com",
  messagingSenderId: "947608384956",
  appId: "1:947608384956:web:bef3ff76b39a61bec167b9",
  measurementId: "G-9E9WDPPWKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }