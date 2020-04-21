import React  from 'react'
import { useSelectedCharacterValue } from '../context'

export const Header = () => {
  const { selectedCharacter } = useSelectedCharacterValue()
  
  return (
    <header>
      <h1>Dnd Tool</h1>
      <h2>{selectedCharacter.name}</h2>
      <h3>Total kills: </h3>
    </header>
  )
}


