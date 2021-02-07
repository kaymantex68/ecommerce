import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM4T-IzMYxL-4J3HZAV2-6z2GG4b8kW1U",
  authDomain: "ecommerce-99300.firebaseapp.com",
  projectId: "ecommerce-99300",
  storageBucket: "ecommerce-99300.appspot.com",
  messagingSenderId: "230899564767",
  appId: "1:230899564767:web:ac6814e2156746e1a2296a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
// export const googleAuthProvider = firebase.auth.GoogleAuthProvider()
