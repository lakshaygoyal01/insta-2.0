// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo6BISA8YZQAjNp9RqnCXqsr-BwOSThUk",
  authDomain: "insta-clone-02.firebaseapp.com",
  projectId: "insta-clone-02",
  storageBucket: "insta-clone-02.appspot.com",
  messagingSenderId: "678537079664",
  appId: "1:678537079664:web:5ee639182c8c8097affdb5"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(); 
const storage = getStorage();

export {app, db, storage};