import React from 'react';
import { Characters } from './components/Characters'
import { useCharacters } from './hooks'

const App = () => {
  const { characters, setCharacters } = useCharacters()
  return (
    <div className="App">
      <Characters characters={characters} setCharacters={setCharacters}/>
    </div>
  );
}

export default App;
