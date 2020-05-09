import React, { useState } from 'react'
import { firebase } from '../firebase'
import { useKills } from '../hooks'
import { useDisplayStateContextValue } from '../context'


export const IndividualKill = ({kill, selectedCharacter}) => {
  const [deleteKillOverlay, setDeleteKillOverlay] = useState(false)
  const { kills, setKills } = useKills(selectedCharacter.characterId)
  const [updatedKillNotes, setUpdatedKillNotes] = useState(kill.notes)
  const { setShowKillsSummary } = useDisplayStateContextValue()

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
        // setKills([...kills])
        setShowKillsSummary(true)
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
    <div className="individual-kill-container rpgui-container">
      <p>{kill.date}</p>
      <div className="description-container">
        <textarea
          type="text"
          value={updatedKillNotes}
          onChange={(e)=>setUpdatedKillNotes(e.target.value)}
          className="rpgui-container framed-golden"
        />
        <div className="button-container-outer">
          <div className="button-container">
            <button
              className="rpgui-button small-button"
              type="button"
              onClick={()=> updateKillCount(kill.killId, true)}
            >+</button>
            <p>{kill.quantity}</p>
            <button
              className="rpgui-button small-button"
              type="button"
              onClick={()=> updateKillCount(kill.killId, false)}
            >-</button>
          </div>
          <button
            className="rpgui-button"
            onClick={()=>setDeleteKillOverlay(true)}
          >
            Delete
          </button>
          {deleteKillOverlay && (
            <div>
              <button
                className="rpgui-button confirm"
                type="button"
                onClick={()=>{
                  deleteKill(kill.killId)
                }}
              >
                Confirm
              </button>
              <p className="cancel rpgui-cursor-point"
                onClick={()=>{
                  setDeleteKillOverlay(false)
                }}>
                Cancel
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="individual-kill-container-inner">
        <button
          className="rpgui-button"
          onClick={()=>updateKillNotes(kill.killId, updatedKillNotes)}
        >Update Notes</button>
      </div> 
    </div>
  )
}