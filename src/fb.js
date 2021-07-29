import firebase from "firebase";
import Vue from "vue";

Vue.use(firebase);

const firebaseConfig = {
  apiKey: "AIzaSyCF3iM_v9d8r-ede8G1XK7crAcHmZTgjUU",
  authDomain: "inichat-5f91e.firebaseapp.com",
  databaseURL: "https://inichat-5f91e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "inichat-5f91e",
  storageBucket: "inichat-5f91e.appspot.com",
  messagingSenderId: "649655941413",
  appId: "1:649655941413:web:82b1b707573b343ac6c2cc"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export default fb;