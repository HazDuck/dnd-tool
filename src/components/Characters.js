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
        <span>Selected character is: {selectedCharacter.name} </span>
        <ul>
          {characters.map((character) => (
            <IndividualCharacter key={character.characterId} character={character} />
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