import React, { useState, useEffect } from 'react';
import { useKills } from '../hooks'
import { useSelectedCharacterValue } from '../context'
import { dataCleanUp } from '../helpers'
import { IndividualKill } from './IndividualKill'
import { LoadingBar } from './LoadingBar'

export const Kills = () => {
  const { selectedCharacter } = useSelectedCharacterValue()
  const { kills } = useKills(selectedCharacter.characterId)
  const [ monsterData ] = useState(dataCleanUp())
  const [killsData, setKillsData] = useState([])
  const [loadingValue, setLoadingValue] = useState(10)
  const [showLoading, setShowLoading] = useState(true)

  //map over the monsterData and if the monsterId on firebase matches the monsterData monsterId
  //merge the objects together so we can setKillsData and render whats needed
  const findKills = (monsterData, kills) => {
    if (kills) {
      setShowLoading(false)
    }
    const killsData = []
    kills.map(kill => {
      let killedMonster = monsterData.filter(monster => 
        parseInt(kill.monsterId) === parseInt(monster.monsterId)
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
    if (JSON.stringify(findKills(monsterData, kills)) !== JSON.stringify(killsData)) {
      setKillsData(findKills(monsterData, kills))
    }
  },[monsterData, kills, killsData])

  useEffect(() => {
    if (!showLoading) {
      return
    }  else if (loadingValue === 100 ) {
      return 
    }
    const fillBar = setInterval(() => setLoadingValue(loadingValue + 10), 1000)
    return () => {
      clearInterval(fillBar)
    }
  }, [showLoading, loadingValue])

  return (
    showLoading ? 
      <div>
        <p>summoning...</p>
        <LoadingBar loadingValue={loadingValue}/>
      </div>
      :
      killsData.length > 0 && (
        <ul>{killsData.map(kill => 
          <li key={kill.monsterId}>
            <IndividualKill kill={kill} selectedCharacter={selectedCharacter}/>
          </li>
      )}</ul>
    )
  )
}