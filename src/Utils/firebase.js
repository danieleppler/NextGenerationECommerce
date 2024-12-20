import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3jEUy0Ki0Yk-FjQUcEN0K-6QpxXtZ5iw",
  authDomain: "yanivarad-react-final.firebaseapp.com",
  projectId: "yanivarad-react-final",
  storageBucket: "yanivarad-react-final.appspot.com",
  messagingSenderId: "368782778205",
  appId: "1:368782778205:web:181e3532961c20ca83d2b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;