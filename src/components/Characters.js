import React, { useState } from 'react'
import { AddCharacter } from './AddCharacter';
import { useCharactersValue, useSelectedCharacterValue } from '../context'

export const Characters = () => {
  const [addCharacterOverlay, setAddCharacterOverlay] = useState(false)
  const { characters } = useCharactersValue()
  const { selectedCharacter, setSelectedCharacter } = useSelectedCharacterValue()
  
  return (
    characters && (
      <section>
        <span>Selected character is: {selectedCharacter.name} </span>
        <ul>
          {characters.map((character) => (
            <li key={character.characterId}>
              <span
                onClick={()=>{
                  setSelectedCharacter(character)}
                }
              >
                {character.name}
              </span>
              <button>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={()=>setAddCharacterOverlay(!addCharacterOverlay)}
        >
          Add new character
        </button>

        {addCharacterOverlay && 
          <AddCharacter setAddCharacterOverlay={setAddCharacterOverlay}
        />}
      </section>
    )
  )
}