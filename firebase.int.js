// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3mWGCw2E2myEx5CacXgruGRbEDP86Nhw",
  authDomain: "email--password--auth.firebaseapp.com",
  projectId: "email--password--auth",
  storageBucket: "email--password--auth.appspot.com",
  messagingSenderId: "407926792929",
  appId: "1:407926792929:web:9a4ea4937b77b8c7740da0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default (app);