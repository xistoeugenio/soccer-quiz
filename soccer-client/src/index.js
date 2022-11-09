import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SinglePlayerProvider } from './context/SinglePlayerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SinglePlayerProvider>
    <App />
    </SinglePlayerProvider>
  </React.StrictMode>
);
