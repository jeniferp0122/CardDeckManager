// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAOqeVU7HL1Nfe1xE5xO4Iny0x-a4CGS-s",
    authDomain: "card-deck-f8501.firebaseapp.com",
    projectId: "card-deck-f8501",
    storageBucket: "card-deck-f8501.firebasestorage.app",
    messagingSenderId: "199516400686",
    appId: "1:199516400686:web:4159c81cf9b3ddd14d83bf",
    measurementId: "G-G7KE2HPLQY",
  },
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
