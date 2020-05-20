import React from 'react' 
import { useAppValue } from '../context'
import { Sidebar } from './Sidebar';
import { KillsSummary } from './KillsSummary'

export const Content = () => {
  const { selectedCharacter } = useAppValue()

  return (
    <>
      <Sidebar />
      {selectedCharacter && (
        <KillsSummary />
      )}
    </>
  )
}
