import React from 'react';
import { Characters } from './components/Characters'
import { CharactersProvider, SelectedCharacterProvider} from './context'

const App = () => {
  return (
    <SelectedCharacterProvider>
      <CharactersProvider>
        <Characters />
      </CharactersProvider>
    </SelectedCharacterProvider>
  );
}

export default App;
