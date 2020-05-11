import React from 'react';
import { AppProvider, CharactersProvider, SelectedCharacterProvider, SelectedMonsterProvider, DisplayStateProvider, UserProvider } from './context'
import { Header } from './components/Header';
import { Auth } from './components/Auth'
import { Content } from './components/Content'

const App = () => {

  return (
    <AppProvider>
      <UserProvider>
        <DisplayStateProvider>
          <SelectedCharacterProvider>
            <CharactersProvider>
              <SelectedMonsterProvider>
                <div className="rpgui-content">
                  <div className="rpgui-container framed">
                    <Header />
                    <div className="main-container">
                      <Auth />
                      <Content />
                    </div>
                  </div>
                </div>
              </SelectedMonsterProvider>
            </CharactersProvider>
          </SelectedCharacterProvider>
        </DisplayStateProvider>
      </UserProvider>
    </AppProvider>
  );
}

export default App;
