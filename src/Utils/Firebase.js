// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjNAQV3rfji6nSVF16CMgnYDQPFsfBw-A",
  authDomain: "netflix-gpt-da2ba.firebaseapp.com",
  projectId: "netflix-gpt-da2ba",
  storageBucket: "netflix-gpt-da2ba.firebasestorage.app",
  messagingSenderId: "79169442220",
  appId: "1:79169442220:web:7300c49f5a6c85851faa09",
  measurementId: "G-DJR5V8PRS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Common Lines 
export const auth = getAuth();