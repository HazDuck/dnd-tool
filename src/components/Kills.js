import React, { useState, useEffect } from 'react';
import { useSelectedCharacterValue } from '../context'
import { IndividualKill } from './IndividualKill'
import { LoadingBar } from './LoadingBar'

export const Kills = ({selectedMonster, killsData, setShowKillsModal}) => {
  const { selectedCharacter } = useSelectedCharacterValue()
  const [loadingValue, setLoadingValue] = useState(10)
  const [showLoading, setShowLoading] = useState(true)
  const [filteredKillsData, setFilteredKillsData] = useState([])

  useEffect(() => {
    if (!killsData.length > 0) {
      return
    }
    setFilteredKillsData(killsData.filter(kill => kill.monsterId === selectedMonster))
    setShowLoading(false)
  }, [killsData, selectedMonster])

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

  console.log(filteredKillsData)
  return (
    showLoading ? 
      <div>
        <p>summoning...</p>
        <LoadingBar loadingValue={loadingValue}/>
      </div>
      :
      filteredKillsData.length > 0 && (
        <div>
          {filteredKillsData.map((kill, index) => {
            if (index === 0) {
              return (
                <div>
                  <button
                    onClick={()=>setShowKillsModal(false)}
                  >
                    Close
                  </button>
                  <div>
                    <h4>{kill.name}</h4>
                    <p>{kill.description}</p>
                    <img style={{width: "100px", height:"auto"}} src={kill.img} alt={`${kill.name}`}/>
                  </div>
                  <div key={kill.killId}>
                    <IndividualKill kill={kill} selectedCharacter={selectedCharacter}/>
                  </div>
                </div>
              )
            }
            return (
              <div key={kill.killId}>
                <IndividualKill kill={kill} selectedCharacter={selectedCharacter}/>
              </div>
            )
          })}
        </div>
    )
  )
}