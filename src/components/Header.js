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
    <header className="header">
      <img className="header-skelly" src="/images/skelly2.png" alt="skelly"/>
      <div className="heading-container">
        <h1>Dnd Tool</h1>
        <hr className="golden"></hr>
        <h3>- Remember what you done killed -</h3>
        <div className="rpgui-container framed-golden-2 selected-character">
          <h2>{selectedCharacter.name}</h2>
          <h3>Kills: {totalKills}</h3>
        </div>
      </div>
      <img className="header-skelly right" src="/images/skelly2.png" alt="skelly"/>
    </header>
  )
}


