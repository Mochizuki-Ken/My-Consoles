// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJg9pOsoNqLN9J_Fyshd-QvKRkFUGdJT0",
  authDomain: "my-consoles.firebaseapp.com",
  projectId: "my-consoles",
  storageBucket: "my-consoles.appspot.com",
  messagingSenderId: "636485161295",
  appId: "1:636485161295:web:dd81aae6e8402ffe4ff53a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase

