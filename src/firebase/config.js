import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBHoSaPtZK5kAiLcvcsQfycdj4cZUN77qk',
  authDomain: 'best-project-abcbc.firebaseapp.com',
  projectId: 'best-project-abcbc',
  storageBucket: 'best-project-abcbc.appspot.com',
  messagingSenderId: '740473758078',
  appId: '1:740473758078:web:0b91eafc2046fb5ec0532f',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
