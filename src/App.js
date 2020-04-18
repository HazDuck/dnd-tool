import React from 'react';
import { dataCleanUp } from './helpers'

const App = () => {
  console.log(dataCleanUp())
  return (
    <div className="App">
      <p>dnd tool</p>
    </div>
  );
}

export default App;
