import React from 'react';
import { CharactersProvider, SelectedCharacterProvider, SelectedMonsterProvider, DisplayStateProvider, UserProvider } from './context'
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { KillsSummary } from './components/KillsSummary'
import { Auth } from './components/Auth'

const App = () => {

  return (
    <UserProvider>
      <DisplayStateProvider>
        <SelectedCharacterProvider>
          <CharactersProvider>
            <SelectedMonsterProvider>
              <div className="rpgui-content">
                <div className="rpgui-container framed">
                  <Header />
                  <div className="main-container">
                    <Sidebar />
                    <Auth />
                    {/* <KillsSummary /> */}
                  </div>
                </div>
              </div>
            </SelectedMonsterProvider>
          </CharactersProvider>
        </SelectedCharacterProvider>
      </DisplayStateProvider>
    </UserProvider>
  );
}

export default App;
