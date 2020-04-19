import React, { useState } from 'react'
import { firebase } from '../firebase'

export const AddCharacter = ({setAddCharacterOverlay, setCharacters, characters}) => {
  const [characterName, setCharacterName] = useState('')

  const clearAddCharacter = () => {
    setCharacterName('')
    setAddCharacterOverlay(false)
  }

  const addCharacter = (characterName) => 
    firebase
    .firestore()
    .collection('characters')
    .add({
      archived: false,
      userId: '12345',
      name: characterName
  }).then(()=> {
    console.log('added character to firebase')
    setCharacters([...characters])
    clearAddCharacter()
    }
  )
  
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={characterName}
        onChange={e=>setCharacterName(e.target.value)}
      />
      <button
        type="button"
        onClick={()=>addCharacter(characterName)}
      >
        Confirm
      </button>
      <span
        onClick={()=>clearAddCharacter()}
      >
        Cancel
      </span>
    </div>
  )
}