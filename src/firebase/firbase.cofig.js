// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeD-KAxJvZXhbCDnRhc6bXfzCLjdexdsA",
  authDomain: "usera-email-password-auth.firebaseapp.com",
  projectId: "usera-email-password-auth",
  storageBucket: "usera-email-password-auth.firebasestorage.app",
  messagingSenderId: "751819570331",
  appId: "1:751819570331:web:ecafb73587409a1fb6da3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;