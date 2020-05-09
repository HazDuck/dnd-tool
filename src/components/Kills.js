import React, { useState, useEffect } from 'react';
import { useSelectedCharacterValue, useDisplayStateContextValue } from '../context'
import { IndividualKill } from './IndividualKill'
// import { LoadingBar } from './LoadingBar'

export const Kills = ({ selectedMonster, killsData }) => {
  const { selectedCharacter } = useSelectedCharacterValue()
  // const [loadingValue, setLoadingValue] = useState(10)
  // const [showLoading, setShowLoading] = useState(true)
  const [filteredKillsData, setFilteredKillsData] = useState([])
  const { setShowKillsModal, setShowKillsSummary } = useDisplayStateContextValue()

//this is where i think the memory leak is 
  useEffect(() => {
    if (!killsData.length > 0) {
      return
    }
    setFilteredKillsData(killsData.filter(kill => kill.monsterId === selectedMonster))
    // setShowLoading(false)
  }, [killsData, selectedMonster])

  //manages bar updating
  // useEffect(() => {
  //   if (!showLoading) {
  //     return
  //   }  else if (loadingValue === 100 ) {
  //     return 
  //   }
  //   const fillBar = setInterval(() => setLoadingValue(loadingValue + 10), 1000)
  //   return () => {
  //     clearInterval(fillBar)
  //   }
  // }, [showLoading, loadingValue])

  console.log(filteredKillsData, 'filteredKillsData')

  return (
    // showLoading ? 
    //   <div>
    //     <p>summoning...</p>
    //     <LoadingBar loadingValue={loadingValue}/>
    //   </div>
    //   : 
    filteredKillsData.length > 0 && (
        <div>
          {filteredKillsData.map((kill, index) => {
            if (index === 0) {
              return (
                <div className="kill-container" key={kill.killId}>
                  <div className="close-kills-button-container">
                    <button 
                      className="rpgui-button"
                      onClick={()=> {
                        setShowKillsModal(false)
                        setShowKillsSummary(true)
                      }}>
                      Back to summary
                    </button>
                  </div>
                  <div className="kill-monster-info">
                    <div className="rpgui-container framed monster-image-container">
                      <img src={kill.img} alt={`${kill.name}`}/>
                    </div>
                    <div className="rpgui-container framed-grey monster-text-container">
                      <h4>{kill.name}</h4>
                      <p>{kill.description}</p>
                    </div>
                  </div>
                  <div>
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