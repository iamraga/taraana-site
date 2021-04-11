import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCTHjYTf55FfcRjy80pzZBHYbs8dnTWbh0",
    authDomain: "taraana-site-88f82.firebaseapp.com",
    projectId: "taraana-site-88f82",
    storageBucket: "taraana-site-88f82.appspot.com",
    messagingSenderId: "415750904645",
    appId: "1:415750904645:web:1a6a783b1a0c71b5f7fc2c",
    measurementId: "G-8XQ39JGNH9"
};

// Initialize Firebase
(!firebase.apps.length) ? firebase.initializeApp(firebaseConfig) : firebase.app();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const increment = firebase.firestore.FieldValue.increment;

export { projectFirestore, projectStorage, timestamp, increment };
