import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpgLQ7PwV3mL1KCXSKcgWJWvis4npQKyk",
    authDomain: "notey-d6996.firebaseapp.com",
    projectId: "notey-d6996",
    storageBucket: "notey-d6996.appspot.com",
    messagingSenderId: "839235652630",
    appId: "1:839235652630:web:8ff27ac8aed0d979f03937",
    measurementId: "G-XQ1Q7RSDH6"
  };
  firebase.initializeApp(firebaseConfig);