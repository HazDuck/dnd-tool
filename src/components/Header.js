import React, { useEffect, useState } from 'react'
import { useSelectedCharacterValue } from '../context'
import { useKills } from '../hooks';

export const Header = () => {
  const { selectedCharacter } = useSelectedCharacterValue()
  const { kills } = useKills(selectedCharacter.characterId)
  const [totalKills, setTotalKills] = useState('')

  const calculateTotalKills = kills => kills.reduce((total, kill) => total + parseInt(kill.quantity), 0)

  useEffect(() => {
    if (!kills.length > 0) {
      return
    }
    setTotalKills(calculateTotalKills(kills))
  }, [kills])
  
  return (
    <header>
      <h1>Dnd Tool</h1>
      <h2>{selectedCharacter.name}</h2>
      <h3>Total kills: {totalKills}</h3>
    </header>
  )
}


