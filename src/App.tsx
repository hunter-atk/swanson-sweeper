import React from 'react';
import { useContext } from 'react';
import './App.sass';

// components
import { Leaderboard, Board, ScoreForm, Settings } from './components'

// contexts
import { GameCompletionTimeContextProvider, GameDifficultyContextProvider, GameStatsContextProvider, IsLoadingContextProvider, TimeframeContextProvider, ScoresContextProvider, GameStatsContext } from './contexts/index';

// styles
import './App.sass'



export const App: React.FC = () => {
  const { coinsGathered } = useContext(GameStatsContext);

  return (
    <div className="appMain">
      <div className="appCoinCounter">{coinsGathered}</div>
      <Board />
      {/* <Settings />
      <Leaderboard />
      <ScoreForm /> */}
    </div>
  )
};

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
