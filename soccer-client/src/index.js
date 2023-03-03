import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameProvider } from './context/gameContext';
import { SinglePlayerProvider } from './context/SinglePlayerContext';
import { AuthContextProvider } from './context/AuthContext';
import { GameModeProvider } from './context/GameModeContext';
import { RankedMatchProvider } from './context/rankedMatchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameModeProvider>
      <GameProvider>
        <SinglePlayerProvider>
          <AuthContextProvider>
            <RankedMatchProvider>
              <App />
            </RankedMatchProvider>
          </AuthContextProvider>
        </SinglePlayerProvider>
      </GameProvider>
    </GameModeProvider>
  </React.StrictMode>
);
