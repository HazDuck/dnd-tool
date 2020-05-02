import React, { useEffect } from 'react';
import { CharactersProvider, SelectedCharacterProvider, SelectedMonsterProvider, DisplayStateProvider} from './context'
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { KillsSummary } from './components/KillsSummary'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { userStatus } from './auth'

const App = () => {

  useEffect(() => {
    userStatus()
  })
  
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
                  <Signup />
                  <Login />
                  {/* <KillsSummary /> */}
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
