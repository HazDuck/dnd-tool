import React, { useState, useEffect } from 'react';
import { useKills, useSelectedMonster } from '../hooks'
import { useSelectedCharacterValue } from '../context'
import { dataCleanUp } from '../helpers'
import { Kills } from './Kills'
import { LoadingBar } from './LoadingBar'

export const KillsSummary = () => {
  const { selectedCharacter } = useSelectedCharacterValue()
  const { kills } = useKills(selectedCharacter.characterId)
  const [ monsterData ] = useState(dataCleanUp())
  const [killsData, setKillsData] = useState([])
  const [loadingValue, setLoadingValue] = useState(10)
  const [showLoading, setShowLoading] = useState(true)
  const [summaryData, setSummaryData] = useState([])
  const { selectedMonster, setSelectedMonster} = useSelectedMonster('')
  const [showKillsModal, setShowKillsModal] = useState(false)

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
      if (summaryData.some(monster => monster.monsterId === kill.monsterId)) {
        const toInc = summaryData.find(monster => monster.monsterId === kill.monsterId)
        toInc.quantity += kill.quantity
      } else {
        const summaryKillDataMultiple = {
          name: kill.name, 
          img: kill.img, 
          monsterId: kill.monsterId,
          quantity: kill.quantity
        }
        summaryData.push(summaryKillDataMultiple)
      }
    })
    return summaryData
  }

  useEffect(() => {
    if (!kills.length > 0) {
      return
    }
    if (JSON.stringify(findKills(monsterData, kills)) !== JSON.stringify(killsData)) {
      setKillsData(findKills(monsterData, kills))
    }
    setShowLoading(false)
  },[monsterData, kills, killsData])

  //manages bar updating
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

  //filter killsData by sleected monster
  useEffect(() => {
    setSummaryData(calculateSummaryData(killsData))
  }, [killsData])

  return (
    showLoading ? 
      <div className="rpgui-container framed">
        <p>summoning...</p>
        <LoadingBar loadingValue={loadingValue} data-testid="LoadingBarKillsSummary"/>
      </div>
      :
      summaryData.length > 0 && (
        <div className="rpgui-container framed kills-summary-container" data-testid="KillsSummary">
          <ul>{summaryData.map(kill => 
            <li
            className="kill-summary"
            onClick={()=> {
              setSelectedMonster(kill.monsterId)
              setShowKillsModal(true)
            }}
            key={kill.monsterId}>
              <img style={{width: "100px", height:"auto"}} src={kill.img} alt={`${kill.name}`}/>
              <h4>{kill.name}</h4>
              <h4>{kill.quantity}</h4>
            </li>
          )}</ul>
          {showKillsModal && (
            <Kills selectedMonster={selectedMonster} killsData={killsData} setShowKillsModal={setShowKillsModal}/>
          )}
        </div>
      )
  )
}
