import React, { createContext, useContext } from 'react'
import { useCharacters, useSelectedCharacter, useKills } from '../hooks'

export const CharacterContext = createContext() 

export const CharactersProvider = ({children}) => {
  const { characters, setCharacters } = useCharacters()

  return (
    <CharacterContext.Provider value={{characters, setCharacters}}>
      {children}
    </CharacterContext.Provider>
  )
}
export const useCharactersValue = () => useContext(CharacterContext)

//-----------------------------------------------------------------------//

export const SelectedCharacterContext = createContext() 

export const SelectedCharacterProvider = ({children}) => {
  const { selectedCharacter, setSelectedCharacter } = useSelectedCharacter()

  return (
    <SelectedCharacterContext.Provider value={{selectedCharacter, setSelectedCharacter}}>
      {children}
    </SelectedCharacterContext.Provider>
  )
}

export const useSelectedCharacterValue = () => useContext(SelectedCharacterContext)
