import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from '@firebase/analytics';
import { getFirestore, serverTimestamp, increment, connectFirestoreEmulator } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';
import { getPerformance } from '@firebase/performance';
import 'firebase/storage';
import 'firebase/firestore';
import { connectAuthEmulator, getAuth } from '@firebase/auth';

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
const firebaseApp = initializeApp(firebaseConfig);

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);
let analytics;
if (firebaseApp.name && typeof window !== 'undefined') {
    // performance = getPerformance(firebaseApp);
    analytics = getAnalytics(firebaseApp);
}
// connectFirestoreEmulator(firestore, "http://localhost:8080");
// connectAuthEmulator(auth, "http://localhost:9099");

// logEvent(analytics, "firebase_init");
export { firebaseApp, firestore, storage, analytics, serverTimestamp, increment };
