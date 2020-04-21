import React from 'react';
import { useKills } from '../hooks'
import { useSelectedCharacterValue } from '../context'

export const Kills = () => {
  const { selectedCharacter } = useSelectedCharacterValue()
  const { kills } = useKills(selectedCharacter.characterId)
  console.log(kills, 'kill data')
  return (
    kills.length > 0 && (
      <ul>{kills.map(kill =>
        <li key={kill.killId}>
          {kill.notes}
        </li>)}
      </ul>
    )
  )
}