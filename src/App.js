import React from 'react';
import { Characters } from './components/Characters'
import { useCharacters } from './hooks'

const App = () => {
  const { characters } = useCharacters()
  return (
    <div className="App">
      <Characters characters={characters}/>
    </div>
  );
}

export default App;
