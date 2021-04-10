import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IProps {
  coinsGathered: number;
  secondsElapsed: number;
  gameStatus: string;
  setCoinsGathered: Dispatch<SetStateAction<number>>
  setSecondsElapsed: Dispatch<SetStateAction<number>>
  setGameStatus: Dispatch<SetStateAction<string>>
}

export const GameStatsContext = createContext<IProps>({
  coinsGathered: 0,
  secondsElapsed: 0,
  gameStatus: 'pending',
  setCoinsGathered: () => {},
  setSecondsElapsed: () => {},
  setGameStatus: () => {}
});

export const GameStatsContextProvider: React.FC = (props) => {
  const [coinsGathered, setCoinsGathered] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [gameStatus, setGameStatus] = useState('pending');

  const value = { coinsGathered, setCoinsGathered, secondsElapsed, setSecondsElapsed, gameStatus, setGameStatus };

  return (
    <GameStatsContext.Provider value={value}>
      {props.children}
    </GameStatsContext.Provider>
  );
};

export const GameStatsContextConsumer = GameStatsContext.Consumer;