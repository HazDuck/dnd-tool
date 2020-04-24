import React, { useState } from 'react';
import { useSelectedCharacterValue } from '../context'
import { firebase } from '../firebase'

export const IndividualMonster = ({monsterData}) => {

  const { selectedCharacter } = useSelectedCharacterValue()
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')

  const addKill = (selectedCharacter) => {
    firebase
    .firestore()
    .collection('kills')
    .add({
      monsterId: monsterData.monsterId,
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
    <li>
      <h4>{monsterData.name}</h4>
      <span>{quantity}</span>
      <button 
        type="button"
        onClick={()=>setQuantity(quantity + 1)}
      >+</button>
      <button
        type="button" 
        onClick={()=>setQuantity(quantity - 1)}
      >-</button>
      <input
        type="text"
        placeholder="Kill notes"
        value={notes}
        onChange={e=>setNotes(e.target.value)}
      />
      <button
      onClick={()=>addKill(selectedCharacter.characterId)}
      >Add</button>
    </li>
  )
  
}