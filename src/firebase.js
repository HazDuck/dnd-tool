import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDr0RWvBHNF61pPf6Q40dyJUPxd669CTN0",
    authDomain: "dnd-tool-x.firebaseapp.com",
    databaseURL: "https://dnd-tool-x.firebaseio.com",
    projectId: "dnd-tool-x",
    storageBucket: "dnd-tool-x.appspot.com",
    messagingSenderId: "1019549274519",
    appId: "1:1019549274519:web:b7626110a9b42adf2e74d2"
})

export { firebaseConfig as firebase }