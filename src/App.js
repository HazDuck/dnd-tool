import React from 'react';
import { CharactersProvider, SelectedCharacterProvider} from './context'
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Kills } from './components/Kills'

const App = () => {
  return (
    <SelectedCharacterProvider>
      <CharactersProvider>
        <Header />
        <Kills />
        <Sidebar />
      </CharactersProvider>
    </SelectedCharacterProvider>
  );
}

export default App;
