import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCdXevQ2zHp87h1LcjZa2Gl6Eh5UXmaLAI",
    authDomain: "music-691f8.firebaseapp.com",
    projectId: "music-691f8",
    storageBucket: "music-691f8.appspot.com",
    messagingSenderId: "204999515743",
    appId: "1:204999515743:web:c5b570a263873893c545ea"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const projectStorage = firebase.storage();

export { projectAuth, projectFirestore, projectStorage, timestamp };