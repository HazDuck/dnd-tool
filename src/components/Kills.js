import React, { useState, useEffect } from 'react';
import { useKills } from '../hooks'
import { useSelectedCharacterValue } from '../context'
import { dataCleanUp } from '../helpers'
import { firebase } from '../firebase'

export const Kills = () => {

  const { selectedCharacter } = useSelectedCharacterValue()
  const { kills } = useKills(selectedCharacter.characterId)
  const [ monsterData ] = useState(dataCleanUp())
  const [killsData, setKillsData] = useState([])
  
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


  const updateKillCount = () => {
    const killDoc = firebase.firestore().collection('kills').doc('aLrHDGliBm1yL4cLsbeR')
    killDoc.onSnapshot(snapShot => console.log(snapShot.data().quantity))
    // killDoc.update({
    //   quantity: quantity
    // })
  }
  
  
  useEffect(() => {
    if (!kills.length > 0) {
      return
    }
    if(JSON.stringify(findKills(monsterData, kills)) !== JSON.stringify(killsData)) {
      setKillsData(findKills(monsterData, kills))
    }
  },[monsterData, kills, killsData])

  return (
    killsData.length > 0 && (
      <ul>{killsData.map(kill =>
        <li key={kill.monsterId}>
          {/* <img src={kill.img} alt={`${kill.name}`}/> */}
          <h4>{kill.name}</h4>
          <h4>{kill.description}</h4>
          <h4>{kill.notes}</h4>
          <h4>{kill.quantity}</h4>
          <button
            type="button"
            onClick={()=> updateKillCount()}
            
          >+</button>
          <button>-</button>
        </li>)}
      </ul>
    )
  )
}