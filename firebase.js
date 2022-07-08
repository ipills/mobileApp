// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAnbeKMFp4WtWd7IEr9gxXSZlxN5ZKQJHQ",
    authDomain: "ipills.firebaseapp.com",
    projectId: "ipills",
    storageBucket: "ipills.appspot.com",
    messagingSenderId: "877344907712",
    appId: "1:877344907712:web:ee2484a8a56ee747db6825",
    measurementId: "G-2D0ZR64Y8C",
    databaseURL: "https://ipills-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth()

export { auth };

export const db = firebase.database();
