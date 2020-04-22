import React, { useState } from 'react'
import { firebase } from '../firebase'
import { useCharactersValue } from '../context'

export const AddCharacter = ({ setAddCharacterOverlay }) => {
  const [characterName, setCharacterName] = useState('')
  const { characters, setCharacters } = useCharactersValue()

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
      name: characterName,
      userId: '12345'
    })
    .then(()=> {
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