import React from 'react';
import { dataCleanUp } from './helpers'
import { Characters } from './components/Characters'
import { useCharacters } from './hooks'

const App = () => {
  const { characters } = useCharacters()

  return (
    <div className="App">
      <Characters characters={characters}/>
      <p>dnd tool</p>
    </div>
  );
}

export default App;
