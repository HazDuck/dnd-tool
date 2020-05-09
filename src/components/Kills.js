import React, { useState, useEffect } from 'react';
import { useSelectedCharacterValue, useDisplayStateContextValue } from '../context'
import { IndividualKill } from './IndividualKill'

export const Kills = ({ selectedMonster, killsData }) => {
  const { selectedCharacter } = useSelectedCharacterValue()
  const [filteredKillsData, setFilteredKillsData] = useState([])
  const { setShowKillsModal, setShowKillsSummary } = useDisplayStateContextValue()

  useEffect(() => {
    if (!killsData.length > 0) {
      return
    }
    setFilteredKillsData(killsData.filter(kill => kill.monsterId === selectedMonster))
  }, [killsData, selectedMonster])

  return (
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