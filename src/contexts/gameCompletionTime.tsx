import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IProps {
  gameCompletionTime: Number;
  setGameCompletionTime: Dispatch<SetStateAction<number>>
}

export const GameCompletionTimeContext = createContext<IProps>({
  gameCompletionTime: 0,
  setGameCompletionTime: () => {}
});

export const GameCompletionTimeContextProvider: React.FC = (props) => {
  const [gameCompletionTime, setGameCompletionTime] = useState(0);

  const value = { gameCompletionTime, setGameCompletionTime };

  return (
    <GameCompletionTimeContext.Provider value={value}>
      {props.children}
    </GameCompletionTimeContext.Provider>
  );
};

export const GameCompletionTimeContextConsumer = GameCompletionTimeContext.Consumer;
