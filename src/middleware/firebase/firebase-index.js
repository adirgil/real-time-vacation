import firebase from "firebase/app";
import auth from "firebase/auth"
import storage from "firebase/storage"

firebase.initializeApp({
    apiKey: "AIzaSyDmTHv6r28HeveP9U2lvCIlJwReYU1o4-c",
    authDomain: "real-time-vacation.firebaseapp.com",
    databaseURL: "https://real-time-vacation-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "real-time-vacation",
    storageBucket: "real-time-vacation.appspot.com",
    messagingSenderId: "281594142434",
    appId: "1:281594142434:web:5de4e137c1d92d1c1c88bb"
})

export default {
    firebase
}