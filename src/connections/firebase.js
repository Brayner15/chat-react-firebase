import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Importe las funciones que necesita desde los SDK que necesita

// agregue SDK para los productos de Firebase que desee usar
// https://firebase.google.com/docs/web/setup#available-libraries

// La configuración de Firebase de tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyCYFoXGMUYe_aUJr6oP-6FfWvWNLPzASXg",
  authDomain: "chat-5d6e2.firebaseapp.com",
  projectId: "chat-5d6e2",
  storageBucket: "chat-5d6e2.appspot.com",
  messagingSenderId: "528762678617",
  appId: "1:528762678617:web:58c208abb43d433feb3048"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
