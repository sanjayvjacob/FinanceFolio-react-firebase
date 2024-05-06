// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcRE0muj64s4R57oQ3J145tgrIxFhOSCQ",
  authDomain: "expense-tracker-58e83.firebaseapp.com",
  projectId: "expense-tracker-58e83",
  storageBucket: "expense-tracker-58e83.appspot.com",
  messagingSenderId: "1030755300619",
  appId: "1:1030755300619:web:575cb3d10c1904eae39e0e",
  measurementId: "G-36FX27R5JE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

//firebase login
//firebase init
//firebase deploy
