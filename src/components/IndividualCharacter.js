import React, { useState } from 'react'
import { useSelectedCharacterValue, useCharactersValue, useSelectedMonsterValue } from '../context'
import { firebase } from '../firebase'

export const IndividualCharacter = ({character}) => {
  const [deleteCharacterOverlay, setDeleteCharacterOverlay] = useState(false)
  const { setSelectedCharacter } = useSelectedCharacterValue()
  const { characters, setCharacters } = useCharactersValue()
  const { setSelectedMonster } = useSelectedMonsterValue()

  const deleteCharacter = characterId => (
    firebase
    .firestore()
    .collection('characters')
    .doc(characterId)
    .delete()
    .then(()=> {
      setCharacters([...characters])
    })
  )

  return (
    <li>
      <span onClick={()=>{
        setSelectedCharacter(character)
        setSelectedMonster('')
      }}>
        {character.name}
      </span>
      <button onClick={()=>{
        setDeleteCharacterOverlay(true)}
      }>
        x
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