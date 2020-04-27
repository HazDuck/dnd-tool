import React, { useState } from 'react'
import { AddCharacter } from './AddCharacter';
import { useCharactersValue } from '../context'
import { IndividualCharacter } from './IndividualCharacter';

export const Characters = () => {
  const [addCharacterOverlay, setAddCharacterOverlay] = useState(false)
  const { characters } = useCharactersValue()
  
  return (
    characters && (
      <section>
        <div>
          {characters.map((character) => (
            <IndividualCharacter key={character.characterId} character={character} />
          ))}
        </div>
        <button
          type="button"
          onClick={()=>setAddCharacterOverlay(!addCharacterOverlay)}
        >
          +
        </button>

        {addCharacterOverlay && 
          <AddCharacter setAddCharacterOverlay={setAddCharacterOverlay}
        />}
      </section>
    )
  )
}