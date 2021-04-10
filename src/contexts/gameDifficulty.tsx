import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IProps {
  gameDifficulty: string;
  setGameDifficulty: Dispatch<SetStateAction<string>>
}

export const GameDifficultyContext = createContext<IProps>({
  gameDifficulty: 'beginner',
  setGameDifficulty: () => {}
});

export const GameDifficultyContextProvider: React.FC = (props) => {
  const [gameDifficulty, setGameDifficulty] = useState('beginner');

  const value = { gameDifficulty, setGameDifficulty };

  return (
    <GameDifficultyContext.Provider value={value}>
      {props.children}
    </GameDifficultyContext.Provider>
  );
};

export const GameDifficultyContextConsumer = GameDifficultyContext.Consumer;