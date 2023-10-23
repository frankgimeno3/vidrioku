import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIz03mQLUZqhjrxwUPCLYCc-_eAQlAETc",
  authDomain: "vidrioku-b757e.firebaseapp.com",
  projectId: "vidrioku-b757e",
  storageBucket: "vidrioku-b757e.appspot.com",
  messagingSenderId: "227150739660",
  appId: "1:227150739660:web:b98796ce21c6f095756a69"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth }