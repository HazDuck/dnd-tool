import React, { useState } from 'react'
import { AddCharacter } from './AddCharacter';
import { useAppValue } from '../context'
import { IndividualCharacter } from './IndividualCharacter';

export const Characters = ({ setShowSidebar, showSidebar }) => {
  const [addCharacterOverlay, setAddCharacterOverlay] = useState(false)
  const { characters } = useAppValue()
  const { selectedCharacter } = useAppValue()  
  const [showCharacters, setShowCharacters] = useState(true)

  return (
    characters && (
      <section>
        {showCharacters && (
          <div>
            {characters.map((character) => (
              <IndividualCharacter 
                key={character.characterId} 
                character={character} 
                selectedCharacter={selectedCharacter} />
            ))}
          </div>
        )}
        <button
          type="button"
          className="rpgui-button add-character-button"
          onClick={()=>{
            setAddCharacterOverlay(!addCharacterOverlay)
            setShowCharacters(false)
          }}
        >
          Add character
        </button>

        {addCharacterOverlay && 
          <AddCharacter 
            setAddCharacterOverlay={setAddCharacterOverlay} 
            setShowCharacters={setShowCharacters}/>}

        <div className="sidebar-close">
          <button 
            onClick={()=>{
              setShowCharacters(true)
              setShowSidebar(!showSidebar)
            }}
            className="rpgui-button"
          >Close</button>
        </div> 
      </section>
    )
  )
}