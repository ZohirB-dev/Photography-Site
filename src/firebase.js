// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXejAGmjoGG3vU-EyczUwlYrZ4CmPxtEs",
  authDomain: "photographysite-e14c5.firebaseapp.com",
  projectId: "photographysite-e14c5",
  storageBucket: "photographysite-e14c5.appspot.com",
  messagingSenderId: "925674586438",
  appId: "1:925674586438:web:4b513487dd87c7c181e547",
  measurementId: "G-0ZMC9KCQ02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export {storage} ;