import React, { useState } from 'react';
import { useSelectedCharacterValue, useDisplayStateContextValue } from '../context'
import { firebase } from '../firebase'


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
      notes: notes,
      userId: '12345'
    })
    setNotes('')
    setQuantity(1)
  }

  return (
    <div>
      <h4>{monster.name}</h4>
      <img src={monster.img} style={{"width": "250px", "height": "275px"}} alt={monster.name}/>
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
          onClick={()=>setQuantity(quantity - 1)}
        >-</button>
      </div>
      <textarea
        type="text"
        placeholder="Kill notes"
        value={notes}
        onChange={e=>setNotes(e.target.value)}
      />
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
  )
}