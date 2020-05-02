import React, { useState } from 'react'
import { firebase } from '../firebase'
import { useCharactersValue, useUserValue } from '../context'

export const AddCharacter = ({ setAddCharacterOverlay }) => {
  const { user, setUser} = useUserValue()
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
      userId: user.uid
    })
    .then(()=> {
      //trigger firebase by spreading the chars
      setCharacters([...characters])
      clearAddCharacter()
      }
    )
  
  return (
    <div className='add-character-container'>
      <input
        type="text"
        placeholder="Name"
        value={characterName}
        onChange={e=>setCharacterName(e.target.value)}
      />
      <div>
        <button
          type="button"
          className="rpgui-button"
          onClick={()=>addCharacter(characterName)}
        >
          Confirm
        </button>
        <span
          onClick={()=>clearAddCharacter()}
          className="rpgui-cursor-point cancel-button"
        >
          Cancel
        </span>
      </div>
    </div>
  )
}