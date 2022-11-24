import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameProvider } from './context/gameContext';
import { SinglePlayerProvider } from './context/SinglePlayerContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameProvider>
      <SinglePlayerProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </SinglePlayerProvider>
    </GameProvider>
  </React.StrictMode>
);
