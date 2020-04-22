import React, { useState, useEffect } from 'react';
import { useKills } from '../hooks'
import { useSelectedCharacterValue } from '../context'
import { dataCleanUp } from '../helpers'

export const Kills = () => {

  const { selectedCharacter } = useSelectedCharacterValue()
  const { kills } = useKills(selectedCharacter.characterId)
  const [monsterData, setMonsterData] = useState(dataCleanUp())
  const [killsData, setKillsData] = useState([])

  console.log(killsData)
  
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
    return killsData
  }

  useEffect(() => {
    if (!kills.length > 0) {
      return
    }
    if(JSON.stringify(findKills(monsterData, kills)) !== JSON.stringify(killsData)) {
      setKillsData(findKills(monsterData, kills))
    }
  },[monsterData, kills,killsData])

  return (
    killsData.length > 0 && (
      <ul>{killsData.map(kill =>
        <li key={kill.monsterId}>
          {/* <img src={kill.img} alt={`${kill.name}`}/> */}
          <h4>{kill.name}</h4>
          <h4>{kill.quantity}</h4>
        </li>)}
      </ul>
    )
  )
}