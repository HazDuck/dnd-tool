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

  //grab the doc grab the quantity, go back to the doc and inc 
  const updateKillCount = (killId, value) => 
    firebase
    .firestore()
    .collection('kills')
    .doc(killId)
    .get()
    .then(quantity => 
      quantity.data().quantity)
    .then(quantity => {
      if (quantity <= 0 && value === false) {
        return 
      }
      firebase
      .firestore()
      .collection('kills')
      .doc(killId)
      .update(
        value ? {quantity : quantity + 1} : {quantity : quantity - 1}
      )
    })
  
  useEffect(() => {
    if (!kills.length > 0) {
      return
    }
    if (JSON.stringify(findKills(monsterData, kills)) !== JSON.stringify(killsData)) {
      setKillsData(findKills(monsterData, kills))
    }
  },[monsterData, kills, killsData])

  return (
    killsData.length > 0 && (
      <ul>{killsData.map(kill =>
        <li key={kill.monsterId}>
          <img style={{width: "100px", height:"auto"}} src={kill.img} alt={`${kill.name}`}/>
          <h4>{kill.name}</h4>
          <p>{kill.description}</p>
          <p>{kill.notes}</p>
          <h4>{kill.quantity}</h4>
          <button
            type="button"
            onClick={()=> updateKillCount(kill.killId, true)}
          >+</button>
          <button
            type="button"
            onClick={()=> updateKillCount(kill.killId, false)}
          >-</button>
        </li>)}
      </ul>
    )
  )
}