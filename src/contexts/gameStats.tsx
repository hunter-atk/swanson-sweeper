import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IProps {
  coinsGathered: number;
  secondsElapsed: number;
  totalCoins: number;
  revealMines: Boolean;
  currentRow: number;
  currentColumn: number;
  setCoinsGathered: Dispatch<SetStateAction<number>>
  setSecondsElapsed: Dispatch<SetStateAction<number>>
  setTotalCoins: Dispatch<SetStateAction<number>>
  setRevealMines: Dispatch<SetStateAction<boolean>>
  setCurrentRow: Dispatch<SetStateAction<number>>
  setCurrentColumn: Dispatch<SetStateAction<number>>
}

export const GameStatsContext = createContext<IProps>({
  coinsGathered: 0,
  secondsElapsed: 0,
  totalCoins: 0,
  revealMines: false,
  currentRow: -1,
  currentColumn: -1,
  setCoinsGathered: () => {},
  setSecondsElapsed: () => {},
  setTotalCoins: () => {},
  setRevealMines: () => {},
  setCurrentRow: () => {},
  setCurrentColumn: () => {}
});

export const GameStatsContextProvider: React.FC = (props) => {
  const [coinsGathered, setCoinsGathered] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [revealMines, setRevealMines] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);

  const value = { coinsGathered, setCoinsGathered, secondsElapsed, setSecondsElapsed, totalCoins, setTotalCoins, revealMines, setRevealMines, currentRow, setCurrentRow, currentColumn, setCurrentColumn };

  return (
    <GameStatsContext.Provider value={value}>
      {props.children}
    </GameStatsContext.Provider>
  );
};

export const GameStatsContextConsumer = GameStatsContext.Consumer;