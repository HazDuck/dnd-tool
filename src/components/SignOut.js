import React from 'react'
import { firebase } from '../firebase';
import { useSelectedCharacterValue, useCharactersValue } from '../context'
import 'firebase/auth';

export const SignOut = () => {
  const { setSelectedCharacter } = useSelectedCharacterValue()
  const { characters, setCharacters } = useCharactersValue()


  const signOut = () => (
    firebase
    .auth()
    .signOut()
    .catch(error => console.log(error))
  )

  console.log(characters, 'characters')

  return (
    <button
      onClick={()=> {
        // setCharacters([])
        setSelectedCharacter('')
        signOut()
      }}
      className="rpgui-button">
    Sign Out</button>
  )
}