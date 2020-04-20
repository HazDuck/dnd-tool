import React, { useState } from 'react'
import { useSelectedCharacterValue, useCharactersValue } from '../context'
import { firebase } from '../firebase'

export const IndividualCharacter = ({character}) => {
  const [deleteCharacterOverlay, setDeleteCharacterOverlay] = useState(false)
  const { setSelectedCharacter } = useSelectedCharacterValue()
  const { characters, setCharacters } = useCharactersValue()

  const deleteCharacter = (characterId) => (
    firebase
    .firestore()
    .collection('characters')
    .doc(characterId)
    .delete()
    .then(()=> {
      setCharacters([...characters])
      console.log('deleted')
    })
  )

  return (
    <li>
      <span onClick={()=>{setSelectedCharacter(character)}}>
        {character.name}
      </span>
      <button onClick={()=>{
        setDeleteCharacterOverlay(true)}
      }>
        Delete
      </button>

      {deleteCharacterOverlay && (
        <div>
          <button
            type="button"
            onClick={()=>{
              deleteCharacter(character.characterId)
              setDeleteCharacterOverlay(false)
            }}
          >
            Confirm
          </button>
          <span onClick={()=>setDeleteCharacterOverlay(false)}>
            Cancel
          </span>
        </div>
      )}
    </li>
  )
}