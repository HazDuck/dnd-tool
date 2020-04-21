import React, { useState, useEffect } from 'react';
import { useKills } from '../hooks'
import { useSelectedCharacterValue } from '../context'
import { dataCleanUp } from '../helpers'
import { orderObjectKeys } from '../helpers'

export const Kills = () => {

  const { selectedCharacter } = useSelectedCharacterValue()
  const { kills } = useKills(selectedCharacter.characterId)
  const [monsterData, setMonsterData] = useState(dataCleanUp())
  const [killsData, setKillsData] = useState([])

  //this probs needs to be a promise (or just save as variable)
  //so that once the data has been cleaned and kills have been returned we can 
  //do the comparision
  
  const findKills = (monsterData, kills) => {
    const killsData = []
    kills.map(kill => {
      let killedMonster = monsterData.filter(monster => 
        kill.monsterId == monster.monsterId
      )
      killedMonster = Object.assign({}, ...killedMonster, {...kill})
      killsData.push(killedMonster)
      return killsData
    })
    console.log(killsData)
    return killsData
  }

  useEffect(() => {
  if (!kills.length > 0) {
    return
  }
      setKillsData(findKills(monsterData, kills))
      console.log(killsData)
  
  
}, [monsterData,
  // kills,
  killsData])

  // console.log(killsData, 'killsData')
  return (
    killsData.length > 0 && (
      <ul>{kills.map(kill =>
        <li key={kill.monsterId}>
          {kill.notes}
        </li>)}
      </ul>
    )
  )
}