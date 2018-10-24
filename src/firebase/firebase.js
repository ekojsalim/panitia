import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAo9kz3tnnMvUdtxOeAGNOAWdFrHXGHHcI",
  authDomain: "panitia-36328.firebaseapp.com",
  databaseURL: "https://panitia-36328.firebaseio.com",
  projectId: "panitia-36328",
  messagingSenderId: "819298182203"
};

firebase.initializeApp(config)
const firebaseFirestore = firebase.firestore();
firebaseFirestore.settings({
  timestampsInSnapshots: true
})

export default firebase;
export const db = firebaseFirestore;
