// Import the functions that need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCeOHVVRW6oZ6gGw1BcdMcpAEVyRyHEBDQ",
    authDomain: "property-rent-b982c.firebaseapp.com",
    projectId: "property-rent-b982c",
    storageBucket: "property-rent-b982c.appspot.com",
    messagingSenderId: "353381087579",
    appId: "1:353381087579:web:b2cf9140d1494f26ab827e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
