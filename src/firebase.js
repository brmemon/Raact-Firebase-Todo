import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyBtjYHGviBtZsJg9mvIw9INyoa_akx5JF4",
    authDomain: "todo-list-4e206.firebaseapp.com",
    projectId: "todo-list-4e206",
    storageBucket: "todo-list-4e206.appspot.com",
    messagingSenderId: "227213205232",
    appId: "1:227213205232:web:8de86ed996e2d9544dec35",
    measurementId: "G-D1649BV2TF"
  };

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();