import { firebase } from '../firebase';
import 'firebase/auth';

//listen for auth status changes
export const userStatus = () => {
  console.log('here)')
  firebase
    .auth()
    .onAuthStateChanged(user => {
      console.log(user, 'statechange listener')
    })
}
