// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAptssXrG4NcHh0PoB-gf0xxTeLWotxS8E",
  authDomain: "flashcardsaas-01.firebaseapp.com",
  projectId: "flashcardsaas-01",
  storageBucket: "flashcardsaas-01.appspot.com",
  messagingSenderId: "395404904779",
  appId: "1:395404904779:web:b812d821c896f4a75040ce",
  measurementId: "G-L8CYJE3KYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);