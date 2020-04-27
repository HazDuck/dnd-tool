import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';

ReactDOM.render(
  <React.StrictMode>
    <App data-testid="app"/>
  </React.StrictMode>,
  document.getElementById('root')
);

