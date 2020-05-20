import React, { createContext, useContext } from 'react'
import { 
  useCharacters, 
  useSelectedCharacter, 
  useSelectedMonster, 
  useDisplayState, 
  useUser} from '../hooks'

export const AppContext = createContext() 
export const AppProvider = ({ children }) => {
  const { user, setUser } = useUser()
  const { selectedCharacter, setSelectedCharacter } = useSelectedCharacter()
  const { selectedMonster, setSelectedMonster } = useSelectedMonster()
  const { characters, setCharacters } = useCharacters()
  const { 
    showKillsModal, 
    setShowKillsModal, 
    showKillsSummary, 
    setShowKillsSummary, 
    showAddKill, 
    setShowAddKill ,
    showSidebar, 
    setShowSidebar
  } = useDisplayState()
  return (
    <AppContext.Provider value={{ 
      user, 
      setUser,
      showKillsModal, 
      setShowKillsModal, 
      showKillsSummary, 
      setShowKillsSummary, 
      showAddKill, 
      setShowAddKill,
      showSidebar, 
      setShowSidebar,
      selectedMonster, 
      setSelectedMonster,
      selectedCharacter, 
      setSelectedCharacter,
      characters, 
      setCharacters
      }}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppValue = () => useContext(AppContext)