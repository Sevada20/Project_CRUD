import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDeagdxjoY-7qiK8QCHTEFO3pV1iNTrFqM",
  authDomain: "crud-bf2ad.firebaseapp.com",
  databaseURL: "https://crud-bf2ad-default-rtdb.firebaseio.com",
  projectId: "crud-bf2ad",
  storageBucket: "crud-bf2ad.appspot.com",
  messagingSenderId: "834281827752",
  appId: "1:834281827752:web:09a7af2cee25bbaf7d819d",
  measurementId: "G-PVH37GZY7K",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
