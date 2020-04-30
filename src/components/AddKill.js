import React, { useState } from 'react';
import { dataCleanUp } from '../helpers'
import { IndividualMonster } from './IndividualMonster'

export const AddKill = ({ setShowKillsSummary, setShowAddKill }) => {
  const [ monsterData ] = useState(dataCleanUp())
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const search = (monsterData, searchValue) => {
    const searchResults = monsterData.filter(monster =>
      monster.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    setSearchResults(searchResults)
  }

  console.log(searchResults)

  return (
    <div>
      <h2>Add kill</h2>
      <input
        type="text"
        placeholder="Search the library..."
        value={searchValue}
        onChange={e=>setSearchValue(e.target.value)}
      />
      <button
        className="rpgui-button"
        onClick={()=> search(monsterData, searchValue)}
      >Search
      </button>
      {searchResults.length > 0 && (
        searchResults.map(monster => (
          <IndividualMonster 
            setShowKillsSummary={setShowKillsSummary} 
            key={monster.monsterId} 
            monster={monster} 
            setSearchResults={setSearchResults}
            setShowAddKill={setShowAddKill}
            /> 
        ))
      )}
    </div>
  )
}