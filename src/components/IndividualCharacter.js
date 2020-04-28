import React, { useState } from 'react'
import { useSelectedCharacterValue, useCharactersValue, useSelectedMonsterValue } from '../context'
import { firebase } from '../firebase'

export const IndividualCharacter = ({ character, selectedCharacter }) => {
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

  console.log(character.name, character.characterId == selectedCharacter.characterId)
  // console.log(character.characterId == selectedCharacter.characterId)

  return (
    <div className="individual-character-container">
      <div className="individual-character-container-inner">
        <span className="character-name rpgui-cursor-point"  onClick={()=>{
          setSelectedCharacter(character)
          setSelectedMonster('')
        }}>
          {character.name}
          {character.characterId == selectedCharacter.characterId ? <div class="rpgui-icon sword"></div> : ''}
        </span>
        <button 
          className="rpgui-button small-button"
          onClick={()=>{setDeleteCharacterOverlay(true)}
        }>
          x
        </button>
      </div>

      {deleteCharacterOverlay && (
        <div>
          <button
            type="button"
            className="rpgui-button"
            onClick={()=>{
              deleteCharacter(character.characterId)
              setDeleteCharacterOverlay(false)
            }}
          >
            Delete
          </button>
          <span 
            className="cancel-button rpgui-cursor-point"
            onClick={()=>setDeleteCharacterOverlay(false)}>
            Cancel
          </span>
        </div>
      )}
    </div>
  )
}