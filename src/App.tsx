import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import './App.sass';

// components
import { BackButton, CoinCounter, MenuSign, Modal, Board, TimeDisplay } from './components';

// contexts
import { GameDataContext, GameDifficultyContext, GameStatsContext, ModalContext, TimerContext } from './contexts/index';

// context providers
import { GameDataContextProvider, GameDifficultyContextProvider, GameStatsContextProvider, LeaderboardContextProvider, ModalContextProvider, TimerContextProvider, ScoresContextProvider } from './contexts/index';

// functions
import { initializeMatrixData } from './functions/initializeMatrixData'

// styles
import './App.sass'

export const App: React.FC = () => {
  const { setDataMatrix } = useContext(GameDataContext);
  const { gameDifficulty } = useContext(GameDifficultyContext);
  const { type, setType } = useContext(ModalContext);
  const { setGameStatus, setCoinsGathered } = useContext(GameStatsContext);
  const { setSecondsElapsed, setTimerRunning } = useContext(TimerContext);
  const [titleIsVisible, setTitleIsVisible] = useState(true);

  let width: number;
  let height: number;
  let mines: number;

  if (gameDifficulty === 'beginner') {
    width = 9;
    height = 9;
    mines = 10;
  } else if (gameDifficulty === 'intermediate') {
    width = 21;
    height = 12;
    mines = 30;
  } else {
    width = 25;
    height = 16;
    mines = 52;
  }

  useEffect(() => {
    setType('intro');
  }, [])

  useEffect(() => {
    if (gameDifficulty) {
      resetBoard();
      return;
    }
  }, [gameDifficulty])

  const resetBoard = () => {
    const newData = initializeMatrixData(width, height, mines);

    setSecondsElapsed(0);
    setTimerRunning(false);
    if (type !== 'intro') {
      setType('');
    }
    setDataMatrix(newData);
    setGameStatus('pending');
    setCoinsGathered(0);
  }

  return (
    <div className="appMain">
      <CoinCounter />
      <BackButton />
      <div>
        <Board width={width} height={height} mines={mines} />
        <div className="appResetButton" onClick={() => resetBoard()} />
      </div>
      <TimeDisplay />
      <MenuSign />
      <Modal />
      {titleIsVisible ? <div className="appIntroTitle" onClick={() => setTitleIsVisible(false)}/> : null}
    </div>
  )
};

export const AppProviders: React.FC = ({ children }) => (
  <LeaderboardContextProvider>
    <ModalContextProvider>
      <TimerContextProvider>
        <GameDataContextProvider>
          <GameDifficultyContextProvider>
            <GameStatsContextProvider>
              <ScoresContextProvider>
                {children}
              </ScoresContextProvider>
            </GameStatsContextProvider>
          </GameDifficultyContextProvider>
        </GameDataContextProvider>
      </TimerContextProvider>
    </ModalContextProvider>
  </LeaderboardContextProvider>
);
