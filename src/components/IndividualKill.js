import React, { useState } from 'react'
import { firebase } from '../firebase'
import { useKills } from '../hooks'

export const IndividualKill = ({kill, selectedCharacter}) => {
  const [deleteKillOverlay, setDeleteKillOverlay] = useState(false)
  const { kills, setKills } = useKills(selectedCharacter.characterId)
  const [updatedKillNotes, setUpdatedKillNotes] = useState(kill.notes)

  //grab the doc grab the quantity, go back to the doc and inc. Pass in value as the true/false for inc or dec.
  //use get in this rather than a realtime snapshot.
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

    const deleteKill = killId => 
      firebase
      .firestore()
      .collection('kills')
      .doc(killId)
      .delete()
      .then(()=> {
        setKills([...kills])
      })
    
    const updateKillNotes = (killId, updatedKillNotes) => 
      firebase
      .firestore()
      .collection('kills')
      .doc(killId)
      .update({
        notes: updatedKillNotes
      })
    
  return (
    <div>
      <input
        type="text"
        value={updatedKillNotes}
        onChange={(e)=>setUpdatedKillNotes(e.target.value)}
      />
      <button
        onClick={()=>updateKillNotes(kill.killId, updatedKillNotes)}
      >Update</button>
      <p>{kill.date}</p>
      <p>{kill.quantity}</p>
      <button
        type="button"
        onClick={()=> updateKillCount(kill.killId, true)}
      >+</button>
      <button
        type="button"
        onClick={()=> updateKillCount(kill.killId, false)}
      >-</button>
      <button
        onClick={()=>setDeleteKillOverlay(true)}
      >
        x
      </button>
      {deleteKillOverlay && (
        <div>
          <button
            type="button"
            onClick={()=>{
              deleteKill(kill.killId)
            }}
          >
            Confirm
          </button>
          <span onClick={()=>{
            setDeleteKillOverlay(false)
          }}>
            Cancel
          </span>
        </div>
      )}
    </div>
  )
}