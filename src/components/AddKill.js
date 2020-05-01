import React, { useState } from 'react';
import { dataCleanUp } from '../helpers'
import { IndividualMonster } from './IndividualMonster'
import { useDisplayStateContextValue } from '../context'


export const AddKill = () => {
  const [ monsterData ] = useState(dataCleanUp())
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const { setShowAddKill, setShowKillsSummary } = useDisplayStateContextValue()

  const search = (monsterData, searchValue) => {
    const searchResults = monsterData.filter(monster =>
      monster.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    setSearchResults(searchResults)
  }

  return (
    <div className="add-kill">
      <div className="close-kills-button-container">
        <button 
          className="rpgui-button"
          onClick={()=> {
            setShowAddKill(false)
            setShowKillsSummary(true)
          }}>
          Back to summary
        </button>
      </div>
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
            key={monster.monsterId} 
            monster={monster} 
            setSearchResults={setSearchResults}
          /> 
        ))
      )}
    </div>
  )
}