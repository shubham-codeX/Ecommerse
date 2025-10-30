// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "revoai-7f1ff.firebaseapp.com",
  projectId: "revoai-7f1ff",
  storageBucket: "revoai-7f1ff.firebasestorage.app",
  messagingSenderId: "107523221241",
  appId: "1:107523221241:web:6904c9986dd24116e5e428",
  measurementId: "G-KJCFNFW48C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);