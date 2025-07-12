import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyBP19uhA7jCVOy1P1qAgh7Hb68XYK33Glg",
  authDomain: "recusosh-fede5.firebaseapp.com",
  projectId: "recusosh-fede5",
  storageBucket: "recusosh-fede5.firebasestorage.app",
  messagingSenderId: "54809295735",
  appId: "1:54809295735:web:3bd8528f9a15a35e6fff72",
  measurementId: "G-P9T0SRHGME" 
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const provider = new GoogleAuthProvider(); 
export const db = getFirestore(app); 

