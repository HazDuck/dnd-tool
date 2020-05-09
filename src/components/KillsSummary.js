import React, { useState, useEffect } from 'react';
import { useKills, useSelectedMonster } from '../hooks'
import { useSelectedCharacterValue, useDisplayStateContextValue, useUserValue } from '../context'
import { dataCleanUp} from '../helpers'
import { Kills } from './Kills'
import { AddKill } from './AddKill'
import ReactImageFallback from 'react-image-fallback'

export const KillsSummary = () => {
  const { selectedCharacter } = useSelectedCharacterValue()
  const { user } = useUserValue()
  const { kills } = useKills(selectedCharacter.characterId)
  const [monsterData] = useState(dataCleanUp())
  const [killsData, setKillsData] = useState([])
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
    setTotalKills(calculateTotalKills(kills))
  }, [kills])

  //map over the monsterData and if the monsterId on firebase matches the monsterData monsterId
  //merge the objects together so we can setKillsData and pass to the IndividualKill component
  const findKills = (monsterData, kills) => {
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
    if (JSON.stringify(findKills(monsterData, kills)) !== JSON.stringify(killsData)) {
      setKillsData(findKills(monsterData, kills))
    }
  },[monsterData, kills, killsData])

  //filter killsData by selected monster
  useEffect(() => {
    setSummaryData(calculateSummaryData(killsData))
  }, [killsData])

  return (
    user && (
      <div className="kills-summary-container" data-testid="KillsSummary">
        <div className="rpgui-container framed-golden-2 selected-character">
          <div className="selected-character-inner">
            <div className="rpgui-container framed-golden character-sprite"></div>
            <div>
              <h2>{selectedCharacter.name}</h2>
              <h3>Total kills: {totalKills}</h3>
            </div>
            <button
              className="rpgui-button"
              onClick={()=>{
                if (!showKillsSummary && !showAddKill && showKillsModal) {
                  setShowKillsModal(false)
                  setShowKillsSummary(false)
                  setShowAddKill(true)
                } else {
                  setShowAddKill(!showAddKill)
                  setShowKillsSummary(!showKillsSummary)
                  setShowKillsModal(false)
                }
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
                  <ReactImageFallback
                    src={kill.img} 
                    alt={kill.name}
                    fallbackImage="https://ctl.s6img.com/society6/img/nbp_KwJ89ob771zos4y6G4dZI4I/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/f61fb90371e1424db35af946632c11ec/~~/d20-dice-mimic-pup-red1031296-prints.jpg"
                  />
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
                      className="rpgui-button"
                      onClick={()=> {
                        setSelectedMonster(kill.monsterId)
                        setShowKillsSummary(false)
                        setShowKillsModal(true)
                      }}
                    >More info</button>
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
