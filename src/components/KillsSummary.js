import React, { useState, useEffect } from 'react';
import { useKills } from '../hooks'
import { useSelectedCharacterValue } from '../context'
import { dataCleanUp } from '../helpers'

export const KillsSummary = () => {
  const { selectedCharacter } = useSelectedCharacterValue()
  const { kills } = useKills(selectedCharacter.characterId)
  const [ monsterData ] = useState(dataCleanUp())
  const [killsData, setKillsData] = useState([])
  const [loadingValue, setLoadingValue] = useState(10)
  const [showLoading, setShowLoading] = useState(true)
  const [summaryData, setSummaryData] = useState([])

  //map over the monsterData and if the monsterId on firebase matches the monsterData monsterId
  //merge the objects together so we can setKillsData and pass to the IndividualKill component
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

  //caluculate the summary data (total kill quantity) to display on home screen
  const calculateSummaryData = killsData => {
    let summaryData = []
    killsData.map(kill => {
      let frank = killsData.filter(value => 
        kill.monsterId === value.monsterId)
      if (frank.length > 1) {
        const summaryKillDataMultiple = {
          name: frank[0].name, 
          img: frank[0].img, 
          monsterId: frank[0].monsterId,
          quantity: frank.reduce()
          //do dun write the reduce!
        }
      } else {
        const summaryKillDataInvidual = { 
          name: frank[0].name, 
          img: frank[0].img, 
          monsterId: frank[0].monsterId,
          quantity: frank[0].quantity}
        summaryData.push(summaryKillDataInvidual)
      }
    })
    console.log(summaryData)
    return summaryData
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
    setSummaryData(calculateSummaryData(killsData))
  }, [killsData])

  return (
    summaryData.length > 0 && (
        <ul>{summaryData.map(kill => 
          <li key={kill.monsterId}>
            <p>{kill.name}</p>
          </li>
      )}</ul>
    )
  )
}
