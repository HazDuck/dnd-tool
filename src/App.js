import React from 'react';
import { dataCleanUp } from './helpers'
import { Characters } from './components/Characters'

const App = () => {
  console.log(dataCleanUp())
  return (
    <div className="App">
      <Characters />
      <p>dnd tool</p>
    </div>
  );
}

export default App;
