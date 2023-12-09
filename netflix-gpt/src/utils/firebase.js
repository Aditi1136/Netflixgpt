// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBztIvyG0_pSV7m9UVWcrAQia3Rv6a3kRY",
  authDomain: "netflixgpt-4737c.firebaseapp.com",
  projectId: "netflixgpt-4737c",
  storageBucket: "netflixgpt-4737c.appspot.com",
  messagingSenderId: "928855226243",
  appId: "1:928855226243:web:6d1f6202f75c2b3f7ee8b6",
  measurementId: "G-ELWBEDV6PH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();