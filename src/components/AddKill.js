import React, { useState } from 'react';
import { dataCleanUp } from '../helpers'
import { IndividualMonster } from './IndividualMonster'

export const AddKill = () => {
  const [ monsterData ] = useState(dataCleanUp())

  return (
    monsterData.length > 0 && (
    <ul>
      <IndividualMonster monsterData={monsterData[0]}/>
    </ul>
    )
  )
}