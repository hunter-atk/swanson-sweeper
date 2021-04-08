import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IProps {
  gameDifficulty: String;
  setGameDifficulty: Dispatch<SetStateAction<string>>
}

export const GameDifficultyContext = createContext<IProps>({
  gameDifficulty: 'expert',
  setGameDifficulty: () => {}
});

export const GameDifficultyContextProvider: React.FC = (props) => {
  const [gameDifficulty, setGameDifficulty] = useState('expert');

  const value = { gameDifficulty, setGameDifficulty };

  return (
    <GameDifficultyContext.Provider value={value}>
      {props.children}
    </GameDifficultyContext.Provider>
  );
};

export const GameDifficultyContextConsumer = GameDifficultyContext.Consumer;