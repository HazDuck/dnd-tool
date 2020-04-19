import React from 'react'

export const Characters = ({characters}) => characters && (
  <ul>
    {characters.map(character => (
      <li key={character.characterId}>
        {character.name}
      </li>
    ))}
  </ul>
)