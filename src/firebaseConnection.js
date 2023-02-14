import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBfjVS6hIjd2viS-m37I2QPNbmhYvhGNHE',
  authDomain: 'curso-8626c.firebaseapp.com',
  projectId: 'curso-8626c',
  storageBucket: 'curso-8626c.appspot.com',
  messagingSenderId: '408108038204',
  appId: '1:408108038204:web:4f33d2853fb186c6452b39',
  measurementId: 'G-F6WH8S9ZBF',
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
