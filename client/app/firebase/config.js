import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyB-fqHI-IslrmFTCl0d7I99R5-fw9Yye6E",
  authDomain: "dsd-cohort-2024.firebaseapp.com",
  projectId: "dsd-cohort-2024",
  storageBucket: "dsd-cohort-2024.appspot.com",
  messagingSenderId: "116875775295",
  appId: "1:116875775295:web:25fb29ca1946f53353178a",
  measurementId: "G-V8ZE6FK3SE"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth }

