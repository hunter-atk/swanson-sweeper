import React from 'react';
import './App.sass';

// components
import { Leaderboard } from './components'

// contexts
import { TimeframeContext, TimeframeContextProvider, ScoresContext, ScoresContextProvider } from './contexts/index';


export const App: React.FC = () => (
    <>
      <Leaderboard />
    </>
  );

export const AppProviders: React.FC = ({ children }) => (
  <TimeframeContextProvider>
    <ScoresContextProvider>
      {children}
    </ScoresContextProvider>
  </TimeframeContextProvider>
);
