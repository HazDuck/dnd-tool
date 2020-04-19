import React, { useState } from 'react'
import { firebase } from '../firebase'

export const Characters = ({characters, setCharacters}) => {
  const [addCharacterOverlay, setAddCharacterOverlay] = useState(false)
  const [characterName, setCharacterName] = useState('')

  const addCharacter = (characterName) => 
    firebase
    .firestore()
    .collection('characters')
    .add({
      archived: false,
      userId: '12345',
      name: characterName
  }).then(()=> {
    console.log('added character to firebase')
    setCharacters([...characters])
    clearAddCharacter()
    }
  )

  const clearAddCharacter = () => {
    setCharacterName('')
    setAddCharacterOverlay(false)
  }

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

        {addCharacterOverlay && (
          <div>
            <input
              type="text"
              placeholder="Name"
              value={characterName}
              onChange={e=>setCharacterName(e.target.value)}
            />
            <button
              type="button"
              onClick={()=>addCharacter(characterName)}
            >
              Confirm
            </button>
            <span
              onClick={()=>clearAddCharacter()}
            >
              Cancel
            </span>
          </div>
        )}
      </section>
    )
  )
}