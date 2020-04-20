import React, { useState } from 'react'
import { useSelectedCharacterValue } from '../context'

export const IndividualCharacter = ({character}) => {
  const [deleteCharacterOverlay, setDeleteCharacterOverlay] = useState(false)
  const { setSelectedCharacter } = useSelectedCharacterValue()

  return (
    <li key={character.characterId}>
      <span
        onClick={()=>{
          setSelectedCharacter(character)}
        }
      >
        {character.name}
      </span>
      <button onClick={()=>setDeleteCharacterOverlay(!deleteCharacterOverlay)}>
        Delete
      </button>

      {deleteCharacterOverlay && (
        <div>
          <button
            type="button"
            onClick={()=>console.log('delete!')}
          >
            Confirm
          </button>
          <span onClick={()=>console.log('abort delete')}>
            Cancel
          </span>
        </div>
      )}
    </li>
  )
}