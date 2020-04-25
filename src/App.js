import React from 'react';
import { CharactersProvider, SelectedCharacterProvider, SelectedMonsterProvider} from './context'
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Kills } from './components/Kills'
import { AddKill } from './components/AddKill';
import { KillsSummary } from './components/KillsSummary'

const App = () => {
  return (
    <SelectedCharacterProvider>
      <CharactersProvider>
        <SelectedMonsterProvider>
          <Header />
          <KillsSummary />
          {/* <Kills /> */}
          <Sidebar />
          <AddKill />
        </SelectedMonsterProvider>
      </CharactersProvider>
    </SelectedCharacterProvider>
  );
}

export default App;
