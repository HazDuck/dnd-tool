import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDJDJd3XvPdiWKb3UbgOoyAmext4L8pw-M",
    authDomain: "dnd-tool-fb8eb.firebaseapp.com",
    databaseURL: "https://dnd-tool-fb8eb.firebaseio.com",
    projectId: "dnd-tool-fb8eb",
    storageBucket: "dnd-tool-fb8eb.appspot.com",
    messagingSenderId: "32384205798",
    appId: "1:32384205798:web:6df0cd3e50cbf551d00c27"
})

export { firebaseConfig as firebase }