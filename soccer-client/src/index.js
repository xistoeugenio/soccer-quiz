import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameProvider } from './context/gameContext';
import { SinglePlayerProvider } from './context/SinglePlayerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameProvider>
      <SinglePlayerProvider>
        <App />
      </SinglePlayerProvider>
    </GameProvider>
  </React.StrictMode>
);
