// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zeusai-3f66b.firebaseapp.com",
  projectId: "zeusai-3f66b",
  storageBucket: "zeusai-3f66b.firebasestorage.app",
  messagingSenderId: "912153223878",
  appId: "1:912153223878:web:bf73068a5e67f930d6adc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
