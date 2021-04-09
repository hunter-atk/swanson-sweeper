import React from 'react';
import './App.sass';

// components
import { Leaderboard, Board, ScoreForm, Settings } from './components'

// contexts
import { GameCompletionTimeContextProvider, GameDifficultyContextProvider, GameStatsContextProvider, IsLoadingContextProvider, TimeframeContextProvider, ScoresContextProvider } from './contexts/index';


export const App: React.FC = () => (
  <>
    <Board />
    <Settings />
    <Leaderboard />
    <ScoreForm />
  </>
);

export const AppProviders: React.FC = ({ children }) => (
  <GameCompletionTimeContextProvider>
    <GameDifficultyContextProvider>
      <GameStatsContextProvider>
        <IsLoadingContextProvider>
          <TimeframeContextProvider>
            <ScoresContextProvider>
              {children}
            </ScoresContextProvider>
          </TimeframeContextProvider>
        </IsLoadingContextProvider>
      </GameStatsContextProvider>
    </GameDifficultyContextProvider>
  </GameCompletionTimeContextProvider>
);
