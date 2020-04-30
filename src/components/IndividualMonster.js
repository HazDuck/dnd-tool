import React, { useState } from 'react';
import { useSelectedCharacterValue } from '../context'
import { firebase } from '../firebase'

export const IndividualMonster = ({monster, setSearchResults, setShowKillsSummary, setShowAddKill}) => {

  const { selectedCharacter } = useSelectedCharacterValue()
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')

  const addKill = (selectedCharacter) => {
    firebase
    .firestore()
    .collection('kills')
    .add({
      monsterId: monster.monsterId,
      characterId: selectedCharacter,
      date: '24/04/2020',
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