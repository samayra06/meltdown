// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBldhvu1lPn2e3rp_YeMokN_VuBNl9Q3qA",
  authDomain: "meltdown-787cd.firebaseapp.com",
  projectId: "meltdown-787cd",
  storageBucket: "meltdown-787cd.appspot.com",
  messagingSenderId: "721027549148",
  appId: "1:721027549148:web:b07b2fc38d2bc4e2087119",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
