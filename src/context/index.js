import React, { createContext, useContext } from 'react'
import { useCharacters } from '../hooks'

export const CharacterContext = createContext() 

export const ProjectsProvider = ({children}) => {
  const { characters, setCharacters } = useCharacters()

  return (
    <CharacterContext.Provider value={{characters, setCharacters}}>
      {children}
    </CharacterContext.Provider>
  )
}

export const useCharactersValue = () => useContext(CharacterContext)