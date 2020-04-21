import React, { useEffect } from 'react';
import { useKills } from '../hooks'
import { useSelectedCharacterValue } from '../context'
import { dataCleanUp } from '../helpers'

export const Kills = () => {

  const { selectedCharacter } = useSelectedCharacterValue()
  const { kills } = useKills(selectedCharacter.characterId)
  const data = dataCleanUp()

  // dataCleanUp()
  //this probs needs to be a promise (or just save as variable)
  //so that once the data has been cleaned and kills have been returned we can 
  //do the comparision

  // const findKills = (data, kills) => {
  //   const totalKills = data.map(monster => {
  //     console.log(monster.monsterId)
  //     kills.map(
  //       console.log(kills.monsterId)
  //     )
  //   }
  //   )
  //   return totalKills
  // }

  // useEffect(() => {
  //   if (!kills.length > 0) {
  //     return
  //   }
  //   findKills()

  // }, [kills])

  
  // const monsterData = findKills(data, kills)

  // console.log(monsterData, 'monsterData')
  return (
    kills.length > 0 && (
      <ul>{kills.map(kill =>
        <li key={kill.monsterId}>
          {kill.notes}
        </li>)}
      </ul>
    )
  )
}