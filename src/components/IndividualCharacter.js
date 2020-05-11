import React, { useState, useEffect } from 'react'
import { 
  useSelectedCharacterValue,
  useCharactersValue, 
  useSelectedMonsterValue,
  useDisplayStateContextValue } from '../context'
import { firebase } from '../firebase'

export const IndividualCharacter = ({ character, selectedCharacter }) => {
  const [deleteCharacterOverlay, setDeleteCharacterOverlay] = useState(false)
  const { characters, setCharacters } = useCharactersValue()
  const { setSelectedCharacter } = useSelectedCharacterValue()
  const { setSelectedMonster } = useSelectedMonsterValue()
  const { setShowKillsModal, setShowKillsSummary } = useDisplayStateContextValue()

  useEffect(() => {
    if (!characters) {
      return
    }
    setSelectedCharacter(characters[0])
  }, [characters])

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
    <div className="individual-character-container">
      <div className="individual-character-container-inner">
        <span 
          tabIndex={0}
          className="character-name rpgui-cursor-point"  
          onKeyDown={()=>{
            setSelectedCharacter(character)
            setSelectedMonster('')
            setShowKillsModal(false)
            setShowKillsSummary(true)
          }}
          onClick={()=>{
            setSelectedCharacter(character)
            setSelectedMonster('')
            setShowKillsModal(false)
            setShowKillsSummary(true)
        }}>
          {character.name}
          {selectedCharacter && selectedCharacter.characterId ? 
            character.characterId === selectedCharacter.characterId ? <div className="rpgui-icon sword"></div> : '' 
            : ''}
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
            tabIndex={0}
            className="cancel-button rpgui-cursor-point"
            onClick={()=>setDeleteCharacterOverlay(false)}
            onKeyDown={()=>setDeleteCharacterOverlay(false)}
            >
            Cancel
          </span>
        </div>
      )}
    </div>
  )
}