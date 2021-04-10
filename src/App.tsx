import React from 'react';
import './App.sass';

// components
import { Leaderboard, Board, ScoreForm, Settings } from './components'

// contexts
import { GameCompletionTimeContextProvider, GameDifficultyContextProvider, GameStatsContextProvider, IsLoadingContextProvider, TimeframeContextProvider, ScoresContextProvider } from './contexts/index';

// styles
import './App.sass'



export const App: React.FC = () => (
  <div className="App">
    <Board />
    <Settings />
    <Leaderboard />
    <ScoreForm />
  </div>
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
