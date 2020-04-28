import React, { useState } from 'react'
import { AddCharacter } from './AddCharacter';
import { useCharactersValue, useSelectedCharacterValue } from '../context'
import { IndividualCharacter } from './IndividualCharacter';

export const Characters = () => {
  const [addCharacterOverlay, setAddCharacterOverlay] = useState(false)
  const { characters } = useCharactersValue()
  const { selectedCharacter } = useSelectedCharacterValue()  
  return (
    characters && (
      <section>
        <div>
          {characters.map((character) => (
            <IndividualCharacter 
              key={character.characterId} 
              character={character} 
              selectedCharacter={selectedCharacter} />
          ))}
        </div>
        <button
          type="button"
          className="rpgui-button add-character-button"
          onClick={()=>setAddCharacterOverlay(!addCharacterOverlay)}
        >
          Add character
        </button>

        {addCharacterOverlay && 
          <AddCharacter setAddCharacterOverlay={setAddCharacterOverlay}
        />}
      </section>
    )
  )
}