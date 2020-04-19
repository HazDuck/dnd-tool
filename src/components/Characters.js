import React, { useState } from 'react'
import { AddCharacter } from './AddCharacter';

export const Characters = ({characters, setCharacters}) => {
  const [addCharacterOverlay, setAddCharacterOverlay] = useState(false)
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
          <AddCharacter 
            characters={characters} 
            setCharacters={setCharacters} 
            setAddCharacterOverlay={setAddCharacterOverlay}
          />}
      </section>
    )
  )
}