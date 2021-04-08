import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface Score {
  playerName: string,
  gameCompletionTime: number,
  gameCompletionDate: string,
  gameDifficulty: string
}

interface Scores {
  scoresToday: Score[],
  scoresThisWeek: Score[],
  scoresThisMonth: Score[],
  scoresAllTime: Score[]
}

interface IProps {
  scores: Scores;
  setScores: Dispatch<SetStateAction<Scores>>
}

export const ScoresContext = createContext<IProps>({
  scores: {
    scoresToday: [] as Score[],
    scoresThisWeek: [] as Score[],
    scoresThisMonth: [] as Score[],
    scoresAllTime: [] as Score[]
  },
  setScores: () => {}
});

export const ScoresContextProvider: React.FC = (props) => {
  const [scores, setScores] = useState({
    scoresToday: [] as Score[],
    scoresThisWeek: [] as Score[],
    scoresThisMonth: [] as Score[],
    scoresAllTime: [] as Score[]
  });

  const value = { scores, setScores };

  return (
    <ScoresContext.Provider value={value}>
      {props.children}
    </ScoresContext.Provider>
  );
};

export const ScoresContextConsumer = ScoresContext.Consumer;