// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqDexm02stjso1D6mc_VTQ2j2OoioAb04",
  authDomain: "socialguide-b5617.firebaseapp.com",
  projectId: "socialguide-b5617",
  storageBucket: "socialguide-b5617.appspot.com",
  messagingSenderId: "692727514175",
  appId: "1:692727514175:web:b669a7a327b7d0f389e48a",
  measurementId: "G-FW81BMK6XC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()