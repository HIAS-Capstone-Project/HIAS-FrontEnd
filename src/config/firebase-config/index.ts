// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC90KDIYoRoU_gmu3VI_HWVbuJyVZ-bGhQ',
  authDomain: 'hias-frontend.firebaseapp.com',
  projectId: 'hias-frontend',
  storageBucket: 'hias-frontend.appspot.com',
  messagingSenderId: '449920497227',
  appId: '1:449920497227:web:1e4d8f1288e0d1ccbf3fce',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
