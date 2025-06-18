import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAGDVnZBiNVDog4zXsmVqF3Wuph5eywVMs',
  authDomain: 'weatherapp-10749.firebaseapp.com',
  projectId: 'weatherapp-10749',
  storageBucket: 'weatherapp-10749.firebasestorage.app',
  messagingSenderId: '786116960086',
  appId: '1:786116960086:web:b323afa8b5375fa53c00f7',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { signInWithEmailAndPassword, createUserWithEmailAndPassword };
