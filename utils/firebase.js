import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBTwp4JvZKl5xj41mVVirrPXEoYWY6lHmE",
    authDomain: "taraana-site.firebaseapp.com",
    projectId: "taraana-site",
    storageBucket: "taraana-site.appspot.com",
    messagingSenderId: "781840798245",
    appId: "1:781840798245:web:48c0732c0460494948a5cc",
    measurementId: "G-0LX5PTM12W"
};

// Initialize Firebase
(!firebase.apps.length) ? firebase.initializeApp(firebaseConfig) : firebase.app();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const increment = firebase.firestore.FieldValue.increment;

export { projectFirestore, projectStorage, timestamp, increment };