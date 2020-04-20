import React from 'react';
import { Characters } from './components/Characters'
import { ProjectsProvider } from './context'

const App = () => {
  return (
    <ProjectsProvider>
      <Characters />
    </ProjectsProvider>
  );
}

export default App;
