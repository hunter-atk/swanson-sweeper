import React from 'react';
import { useContext } from 'react';
import './App.sass';

// components
import { CoinCounter, Leaderboard, MenuSign, Board, ScoreForm, Settings, TimeDisplay } from './components'

// contexts
import { GameCompletionTimeContextProvider, GameDifficultyContextProvider, GameStatsContextProvider, IsLoadingContextProvider, TimeframeContextProvider, TimerContextProvider, ScoresContextProvider, GameStatsContext } from './contexts/index';

// styles
import './App.sass'



export const App: React.FC = () => {
  const { coinsGathered } = useContext(GameStatsContext);

  return (
    <div className="appMain">
      <CoinCounter />
      <Board />
      <TimeDisplay />
      <MenuSign />
      {/* <Settings />
      <Leaderboard />
      <ScoreForm /> */}
    </div>
  )
};

export const AppProviders: React.FC = ({ children }) => (
  <TimerContextProvider>
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
  </TimerContextProvider>
);
