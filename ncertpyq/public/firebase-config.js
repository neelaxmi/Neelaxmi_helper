import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, query, where, serverTimestamp, onSnapshot }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  sendPasswordResetEmail, updateProfile, setPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDK2fHoNzm8sVyUOg_RZeUTWFt04z29npo",
  authDomain: "utility-destiny-476204-h0.firebaseapp.com",
  projectId: "utility-destiny-476204-h0",
  storageBucket: "utility-destiny-476204-h0.firebasestorage.app",
  messagingSenderId: "728961917905",
  appId: "1:728961917905:web:c4eb41469adf5f1f8c76f0",
  measurementId: "G-JKJ17FQE7Q",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((e) => console.error("Auth persistence failed:", e));

export { db, collection, doc, getDoc, getDocs, addDoc, query, where, serverTimestamp, onSnapshot,
  auth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  sendPasswordResetEmail, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult };
