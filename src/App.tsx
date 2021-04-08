import React from 'react';
import './App.sass';

// components
import { Leaderboard, ScoreForm, Settings } from './components'

// contexts
import { GameCompletionTimeContextProvider, GameDifficultyContextProvider, IsLoadingContextProvider, TimeframeContextProvider, ScoresContextProvider } from './contexts/index';


export const App: React.FC = () => (
  <>
    <Settings />
    <Leaderboard />
    <ScoreForm />
  </>
);

export const AppProviders: React.FC = ({ children }) => (
  <GameCompletionTimeContextProvider>
    <GameDifficultyContextProvider>
      <IsLoadingContextProvider>
        <TimeframeContextProvider>
          <ScoresContextProvider>
            {children}
          </ScoresContextProvider>
        </TimeframeContextProvider>
      </IsLoadingContextProvider>
    </GameDifficultyContextProvider>
  </GameCompletionTimeContextProvider>
);
