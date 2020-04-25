import React from 'react';
import { CharactersProvider, SelectedCharacterProvider} from './context'
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Kills } from './components/Kills'
import { AddKill } from './components/AddKill';
import { KillsSummary } from './components/KillsSummary'

const App = () => {
  return (
    <SelectedCharacterProvider>
      <CharactersProvider>
        <Header />
        <KillsSummary />
        {/* <Kills /> */}
        <Sidebar />
        <AddKill />
      </CharactersProvider>
    </SelectedCharacterProvider>
  );
}

export default App;
