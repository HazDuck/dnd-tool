import React  from 'react'
import { useSelectedCharacterValue } from '../context'

export const Header = () => {
  const { selectedCharacter } = useSelectedCharacterValue()
  
  return (
    <header>
      <h1>Dnd Tool</h1>
      <h2>Selected character is: {selectedCharacter.name} </h2>
    </header>
  )
}


