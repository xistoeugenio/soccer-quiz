import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameProvider } from './context/gameContext';
import { SinglePlayerProvider } from './context/SinglePlayerContext';
import { AuthContextProvider } from './context/AuthContext';
import { GameModeProvider } from './context/GameModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameModeProvider>
      <GameProvider>
        <SinglePlayerProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </SinglePlayerProvider>
      </GameProvider>
    </GameModeProvider>
  </React.StrictMode>
);
