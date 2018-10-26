import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAo9kz3tnnMvUdtxOeAGNOAWdFrHXGHHcI",
  authDomain: "panitia-36328.firebaseapp.com",
  databaseURL: "https://panitia-36328.firebaseio.com",
  projectId: "panitia-36328",
  storageBucket: "panitia-36328.appspot.com",
  messagingSenderId: "819298182203"
};

firebase.initializeApp(config)
const firebaseFirestore = firebase.firestore();
firebaseFirestore.settings({
  timestampsInSnapshots: true
})

export default firebase;
export const db = firebaseFirestore;
export const storage = firebase.storage();
export const auth = firebase.auth();
