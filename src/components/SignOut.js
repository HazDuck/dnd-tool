import React from 'react'
import { firebase } from '../firebase';
import { useSelectedCharacterValue } from '../context'
import 'firebase/auth';

export const SignOut = () => {
  const { setSelectedCharacter, selectedCharacter } = useSelectedCharacterValue()

  const signOut = () => (
    firebase
    .auth()
    .signOut()
  )

  return (
    <button
      onClick={()=> {
        signOut()
        setSelectedCharacter('')
      }}
      className="rpgui-button">
    Sign Out</button>
  )
}