import React, { useState } from 'react';
import { useSelectedCharacterValue, useDisplayStateContextValue } from '../context'
import { firebase } from '../firebase'
import ReactImageFallback from 'react-image-fallback'


export const IndividualMonster = ({ monster, setSearchResults }) => {
  const { selectedCharacter } = useSelectedCharacterValue()
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const {setShowKillsSummary, setShowAddKill } = useDisplayStateContextValue()

  const timeDate = () => {
    const today = new Date();
    const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
    const time = today.getHours() + ":" + today.getMinutes()
    return date+' '+time;
  }

  const addKill = (selectedCharacter) => {
    firebase
    .firestore()
    .collection('kills')
    .add({
      monsterId: monster.monsterId,
      characterId: selectedCharacter,
      date: timeDate(),
      quantity: quantity,
      notes: notes
    })
    setNotes('')
    setQuantity(1)
  }

  return (
    <div className="individual-monster">
      <h4>{monster.name}</h4>
      <div className="individual-monster-inner">
        <div className="rpgui-container framed monster-image-container">
          <ReactImageFallback
            src={monster.img} 
            alt={monster.name}
            fallbackImage="https://ctl.s6img.com/society6/img/nbp_KwJ89ob771zos4y6G4dZI4I/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/f61fb90371e1424db35af946632c11ec/~~/d20-dice-mimic-pup-red1031296-prints.jpg"
          />
        </div>
        <div className="contents-container">
          <textarea
            type="text"
            placeholder="Kill notes"
            value={notes}
            onChange={e=>setNotes(e.target.value)}
          />
          <div className="buttons-container">
            <div>
              <button
                className="rpgui-button small-button"
                type="button"
                onClick={()=>setQuantity(quantity + 1)}
              >+</button>
              <span>{quantity}</span>
              <button
                className="rpgui-button small-button"
                type="button" 
                onClick={()=>
                  setQuantity(quantity - 1)
                }
              >-</button>
            </div>
            <button
              className="rpgui-button"
              onClick={()=> {
                addKill(selectedCharacter.characterId)
                setSearchResults([])
                setShowKillsSummary(true)
                setShowAddKill(false)
              }}
            >Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}