import React from 'react';
import { CharactersProvider, SelectedCharacterProvider} from './context'
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

const App = () => {
  return (
    <SelectedCharacterProvider>
      <CharactersProvider>
        <Header />
        <Sidebar />
      </CharactersProvider>
    </SelectedCharacterProvider>
  );
}

export default App;
