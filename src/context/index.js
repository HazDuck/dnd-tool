import React, { createContext, useContext } from 'react'
import { 
  useCharacters, 
  useSelectedCharacter, 
  useSelectedMonster, 
  useDisplayState, 
  useUser} from '../hooks'

// export const CharacterContext = createContext() 
// export const CharactersProvider = ({ children }) => {
//   const { characters, setCharacters } = useCharacters()
//   return (
//     <CharacterContext.Provider value={{characters, setCharacters}}>
//       {children}
//     </CharacterContext.Provider>
//   )
// }
// export const useCharactersValue = () => useContext(CharacterContext)

// //-----------------------------------------------------------------------//

// export const SelectedCharacterContext = createContext() 
// export const SelectedCharacterProvider = ({ children }) => {
//   const { selectedCharacter, setSelectedCharacter } = useSelectedCharacter()
//   return (
//     <SelectedCharacterContext.Provider value={{selectedCharacter, setSelectedCharacter}}>
//       {children}
//     </SelectedCharacterContext.Provider>
//   )
// }
// export const useSelectedCharacterValue = () => useContext(SelectedCharacterContext)

// // //-----------------------------------------------------------------------//

// export const SelectedMonsterContext = createContext() 
// export const SelectedMonsterProvider = ({children}) => {
//   const { selectedMonster, setSelectedMonster } = useSelectedMonster()
//   return (
//     <SelectedMonsterContext.Provider value={{selectedMonster, setSelectedMonster}}>
//       {children}
//     </SelectedMonsterContext.Provider>
//   )
// }
// export const useSelectedMonsterValue = () => useContext(SelectedMonsterContext)

// //-----------------------------------------------------------------------//

// export const DisplayStateContext = createContext() 
// export const DisplayStateProvider = ({ children }) => {
//   const { 
//     showKillsModal, 
//     setShowKillsModal, 
//     showKillsSummary, 
//     setShowKillsSummary, 
//     showAddKill, 
//     setShowAddKill ,
//     showSidebar, 
//     setShowSidebar
//   } = useDisplayState()
//   return (
//     <DisplayStateContext.Provider value={{
//       showKillsModal, 
//       setShowKillsModal, 
//       showKillsSummary, 
//       setShowKillsSummary, 
//       showAddKill, 
//       setShowAddKill,
//       showSidebar, 
//       setShowSidebar
//       }}>
//       {children}
//     </DisplayStateContext.Provider>
//   )
// }
// export const useDisplayStateContextValue = () => useContext(DisplayStateContext)

// //-----------------------------------------------------------------------//

// export const UserContext = createContext() 
// export const UserProvider = ({ children }) => {
//   const { user, setUser } = useUser()
//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   )
// }
// export const useUserValue = () => useContext(UserContext)

//-----------------------------------------------------------------------//

export const AppContext = createContext() 
export const AppProvider = ({ children }) => {
  const { user, setUser } = useUser()
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
  const { selectedCharacter, setSelectedCharacter } = useSelectedCharacter()
  const { selectedMonster, setSelectedMonster } = useSelectedMonster()
  const { characters, setCharacters } = useCharacters()
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