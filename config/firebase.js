import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBUj-2DJHc_w_G8hMSVqaVDqefZKrqMgaI",
  authDomain: "noworries-e37a2.firebaseapp.com",
  databaseURL: "https://noworries-e37a2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "noworries-e37a2",
  storageBucket: "noworries-e37a2.appspot.com",
  messagingSenderId: "805564261166",
  appId: "1:805564261166:web:bbd3f00fd76d34832710bf",
  measurementId: "G-R3SCKWMBP3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db, firebaseConfig }