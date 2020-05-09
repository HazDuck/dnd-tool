import React, { useState, useEffect } from 'react';
import { useSelectedCharacterValue, useDisplayStateContextValue } from '../context'
import { IndividualKill } from './IndividualKill'
import ReactImageFallback from 'react-image-fallback'

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
                    <ReactImageFallback
                      src={kill.img} 
                      alt={kill.name}
                      fallbackImage="https://ctl.s6img.com/society6/img/nbp_KwJ89ob771zos4y6G4dZI4I/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/f61fb90371e1424db35af946632c11ec/~~/d20-dice-mimic-pup-red1031296-prints.jpg"
                    />
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