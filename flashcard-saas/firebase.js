// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
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

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics (only if running in a browser and supported)
let analytics;
if (typeof window !== "undefined" && isSupported()) {
    analytics = getAnalytics(app);
}

export { db };
