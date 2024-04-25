import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyDXKMPp14juw7ZIzee734T5pIgjRk5I_yI",
  authDomain: "fitnesstrackingapp-1374d.firebaseapp.com",
  projectId: "fitnesstrackingapp-1374d",
  storageBucket: "fitnesstrackingapp-1374d.appspot.com",
  messagingSenderId: "141555597194",
  appId: "1:141555597194:web:129a94664a34ffa9f35273"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
