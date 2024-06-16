import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBupoIhqAcBhCydsZ1xBbmESX0UpiJtozs",
  authDomain: "rastruant-app.firebaseapp.com",
  projectId: "rastruant-app",
  storageBucket: "rastruant-app.appspot.com",
  messagingSenderId: "751791386204",
  appId: "1:751791386204:web:c8552b23e11a571cec4099",
  measurementId: "G-CB3ETT8XC9"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
 export const storage = getStorage(app);