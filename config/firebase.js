import { initializeApp } from "firebase/app";
import 'firebase/auth';
import Constants from 'expo-constants';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUj-2DJHc_w_G8hMSVqaVDqefZKrqMgaI",
  authDomain: "noworries-e37a2.firebaseapp.com",
  databaseURL: "https://noworries-e37a2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "noworries-e37a2",
  storageBucket: "noworries-e37a2.appspot.com",
  messagingSenderId: "805564261166",
  appId: "1:805564261166:web:e4dea42bf7705b212710bf",
  measurementId: "G-47BG1S2NMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);