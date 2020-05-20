import React from 'react';
import { AppProvider } from './context'
import { Header } from './components/Header';
import { Auth } from './components/Auth'
import { Content } from './components/Content'

const App = () => {

  return (
    <AppProvider>
      <div className="rpgui-content">
        <div className="rpgui-container framed">
          <Header />
          <div className="main-container">
            <Auth />
            <Content />
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
