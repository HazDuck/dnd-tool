import firebase from 'firebase/app';
import 'firebase/auth';

//listen for auth status changes
export const userStatus = () => {
  firebase
    .auth()
    .onAuthStateChanged(user => {
      console.log(user, 'statechange listener')
    })
}
