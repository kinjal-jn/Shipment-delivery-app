// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYOo2XeK7cTcYmGE0dgDDbeHqqwWS1pbc",
  authDomain: "shipment-8b610.firebaseapp.com",
  projectId: "shipment-8b610",
  storageBucket: "shipment-8b610.appspot.com",
  messagingSenderId: "183351044331",
  appId: "1:183351044331:web:ff65442acb5ba82e0736ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
