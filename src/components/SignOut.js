import React from 'react'
import { firebase } from '../firebase';
import { useSelectedCharacterValue } from '../context'
import 'firebase/auth';

export const SignOut = () => {
  const { setSelectedCharacter } = useSelectedCharacterValue()

  const signOut = () => (
    firebase
    .auth()
    .signOut()
    .catch(error => console.log(error))
  )

  return (
    <>
    <hr className="golden"></hr>
    <button
      onClick={()=> {
        setSelectedCharacter('')
        signOut()
      }}
      className="rpgui-button">
    Sign Out</button>
    </>
  )
}