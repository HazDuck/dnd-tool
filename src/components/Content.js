import React from 'react' 
import { useSelectedCharacterValue } from '../context'
import { Sidebar } from './Sidebar';
import { KillsSummary } from './KillsSummary'

export const Content = () => {
  const { selectedCharacter } = useSelectedCharacterValue()

  return (
    <>
      <Sidebar />
      {selectedCharacter && (
        <KillsSummary />
      )}
    </>
  )
}
