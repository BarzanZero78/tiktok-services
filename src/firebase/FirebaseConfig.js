import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB4ZiZEwTnEkWBYYdqXr-hWOLkxo7JlLYg",
  authDomain: "tiktok-services-1dc0f.firebaseapp.com",
  projectId: "tiktok-services-1dc0f",
  storageBucket: "tiktok-services-1dc0f.appspot.com",
  messagingSenderId: "879145348614",
  appId: "1:879145348614:web:88ebff2271792ed083dd87",
  measurementId: "G-H3ZKJBDY0W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);