import React from 'react';
import { CharactersProvider, SelectedCharacterProvider, SelectedMonsterProvider, DisplayStateProvider} from './context'
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { KillsSummary } from './components/KillsSummary'

const App = () => {
  return (
    <DisplayStateProvider>
      <SelectedCharacterProvider>
        <CharactersProvider>
          <SelectedMonsterProvider>
            <div className="rpgui-content">
              <div className="rpgui-container framed">
                <Header />
                <div className="main-container">
                  <Sidebar />
                  <KillsSummary />
                </div>
              </div>
            </div>
          </SelectedMonsterProvider>
        </CharactersProvider>
      </SelectedCharacterProvider>
    </DisplayStateProvider>
  );
}

export default App;
