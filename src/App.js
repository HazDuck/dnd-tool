import React from 'react';
import { CharactersProvider, SelectedCharacterProvider, SelectedMonsterProvider} from './context'
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AddKill } from './components/AddKill';
import { KillsSummary } from './components/KillsSummary'

const App = () => {
  return (
    <SelectedCharacterProvider>
      <CharactersProvider>
        <SelectedMonsterProvider>
          <div className="rpgui-content">
            <div className="rpgui-container framed">
              <Header />
              <div className="main-container">
                <Sidebar />
                <KillsSummary />
                  {/* <AddKill /> */}
              </div>
            </div>
          </div>
        </SelectedMonsterProvider>
      </CharactersProvider>
    </SelectedCharacterProvider>
  );
}

export default App;
