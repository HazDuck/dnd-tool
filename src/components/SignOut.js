import React from 'react'
import { firebase } from '../firebase';
import 'firebase/auth';

export const SignOut = () => {

  const signOut = () => (
    firebase
    .auth()
    .signOut()
  )

  return (
    <button
      onClick={()=>signOut()}
      className="rpgui-button">
    Sign Out</button>
  )
}