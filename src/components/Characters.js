import React, { useState } from 'react'
import { AddCharacter } from './AddCharacter';
import { useCharactersValue } from '../context'

export const Characters = () => {
  const [addCharacterOverlay, setAddCharacterOverlay] = useState(false)
  const { characters } = useCharactersValue()
  
  return (
    characters && (
      <section>
        <span>Selected character is: </span>
        <ul>
          {characters.map((character, index) => (
            <li key={index}>
              <span>
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