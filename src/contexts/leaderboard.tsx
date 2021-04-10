import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IProps {
  difficultyLevel: string;
  timeframe: string;
  setDifficultyLevel: Dispatch<SetStateAction<string>>
  setTimeframe: Dispatch<SetStateAction<string>>
}

export const LeaderboardContext = createContext<IProps>({
  difficultyLevel: 'expert',
  timeframe: '',
  setDifficultyLevel: () => {},
  setTimeframe: () => {}
});

export const LeaderboardContextProvider: React.FC = (props) => {
  const [difficultyLevel, setDifficultyLevel] = useState('expert');
  const [timeframe, setTimeframe] = useState('scoresToday');

  const value = { timeframe, setTimeframe, difficultyLevel, setDifficultyLevel };

  return (
    <LeaderboardContext.Provider value={value}>
      {props.children}
    </LeaderboardContext.Provider>
  );
};

export const LeaderboardContextConsumer = LeaderboardContext.Consumer;