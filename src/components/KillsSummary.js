import React, { useState, useEffect } from 'react';
import { useKills, useSelectedMonster } from '../hooks'
import { useSelectedCharacterValue, useDisplayStateContextValue } from '../context'
import { 
  dataCleanUp
  // pixelateImages 
} from '../helpers'
import { Kills } from './Kills'
import { LoadingBar } from './LoadingBar'
import { AddKill } from './AddKill'

export const KillsSummary = () => {
  const { selectedCharacter } = useSelectedCharacterValue()
  const { kills } = useKills(selectedCharacter.characterId)
  const [ monsterData ] = useState(dataCleanUp())
  const [killsData, setKillsData] = useState([])
  const [loadingValue, setLoadingValue] = useState(10)
  const [showLoading, setShowLoading] = useState(true)
  const [summaryData, setSummaryData] = useState([])
  const { selectedMonster, setSelectedMonster} = useSelectedMonster('')
  const [totalKills, setTotalKills] = useState('')
  const { 
    showKillsModal, 
    setShowKillsModal, 
    showKillsSummary, 
    setShowKillsSummary, 
    showAddKill, 
    setShowAddKill } = useDisplayStateContextValue()

  const calculateTotalKills = kills => kills.reduce((total, kill) => total + parseInt(kill.quantity), 0)

  useEffect(() => {
    if (!kills.length > 0) {
      return
    }
    setTotalKills(calculateTotalKills(kills))
  }, [kills])

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
          quantity: kill.quantity,
          description: kill.description
        }
        summaryData.push(summaryKillDataMultiple)
      }
    })
    return summaryData
  }

  //update killsdata
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

  //filter killsData by selected monster
  useEffect(() => {
    setSummaryData(calculateSummaryData(killsData))
  }, [killsData])

  // //pixelate monster images
  // useEffect(() => {
  //   if (document.querySelectorAll('[data-monster-image]').length == 0) {
  //     return 
  //   }
  //   pixelateImages(document.querySelectorAll('[data-monster-image]'))
  // })

  return (
    showLoading ? 
      <div className="rpgui-container framed">
        <p>summoning...</p>
        <LoadingBar loadingValue={loadingValue} data-testid="LoadingBarKillsSummary"/>
      </div>
      :
      summaryData.length > 0 && (
        <div className="rpgui-container framed kills-summary-container" data-testid="KillsSummary">
          <div className="rpgui-container framed-golden-2 selected-character">
          {/* characterselected sprite goes here */}
            <div className="selected-character-inner">
              <div>
                <h2>{selectedCharacter.name}</h2>
                <h3>Total kills: {totalKills}</h3>
              </div>
              <button
                className="rpgui-button"
                onClick={()=>{
                  setShowAddKill(!showAddKill)
                  setShowKillsSummary(!showKillsSummary)
                }}
              >Add kill</button>
            </div>
          </div>
          {showKillsSummary && (
            <div>
              {summaryData.map((kill) => 
                <div
                  className="kill-summary"
                  key={kill.monsterId}>
                  <div className="rpgui-container framed monster-image-container">
                    <img src={kill.img} alt={`${kill.name}`}/>
                  </div>
                  <div className="kill-summary-info">
                    <div>
                      <h2>{kill.name}</h2>
                    </div>
                    <div>
                      <h2>Kills: {kill.quantity}</h2>
                    </div>
                    <div>
                      <button
                        className="rpgui-button golden"
                        onClick={()=> {
                          setSelectedMonster(kill.monsterId)
                          setShowKillsSummary(false)
                          setShowKillsModal(true)
                        }}
                      >Show full details</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {showKillsModal && (
            <Kills 
            selectedMonster={selectedMonster} 
            killsData={killsData} 
            setShowKillsModal={setShowKillsModal}
            setShowKillsSummary={setShowKillsSummary}
            />
          )}
          {showAddKill && (
            <AddKill 
              setShowKillsSummary={setShowKillsSummary}
              setShowAddKill={setShowAddKill}
            />
          )}
        </div>
      )
  )
}
