import firebase from "firebase";
import Vue from "vue";

Vue.use(firebase);

const firebaseConfig = {
  apiKey: "AIzaSyCF3iM_v9d8r",
  authDomain: "firebaseapp.com",
  databaseURL: "firebasedatabase.app",
  projectId: "5f91e",
  storageBucket: "com",
  messagingSenderId: "649655941",
  appId: "1:649b1b707573b343ac6c2cc"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export default fb;
