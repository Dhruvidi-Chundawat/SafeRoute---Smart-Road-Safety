import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgfAxkg9ebrLZqlX_21Ac22MCbf_AVcws",
  authDomain: "saferoute-f5904.firebaseapp.com",
  projectId: "saferoute-f5904",
  storageBucket: "saferoute-f5904.firebasestorage.app",
  messagingSenderId: "317960558774",
  appId: "1:317960558774:web:943feea2b2febe88abae17",
  measurementId: "G-TT8QBB8C22"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

