import React from 'react';
import axios from 'axios';
import { useContext, useEffect } from 'react';

// contexts
import { GameDifficultyContext, TimeframeContext, TimeframeContextProvider, ScoresContext, ScoresContextProvider } from '../../contexts/index';

// styles
import './Leaderboard.sass';

export const Leaderboard: React.FC = () => {
  const { scores, setScores } = useContext(ScoresContext);
  const { timeframe } = useContext(TimeframeContext);
  const { gameDifficulty } = useContext(GameDifficultyContext);

  useEffect(() => {
    if (gameDifficulty) {
      loadScores();
    }
  }, [gameDifficulty])

  useEffect(() => {
    if (scores || timeframe) {
      return;
    }
  }, [scores, timeframe])

  // loads records in leaderboard db
  const loadScores = async () => {
    try {
      const response = await axios.get(`https://glacial-eyrie-20134.herokuapp.com/api/scores/${gameDifficulty}`)
      const result = response.data;
      setScores(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <h1>{gameDifficulty} Leaderboard</h1>

      <table>
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>


          {/* TO-DO: Implement something like this code block => keep it DRY
            {scores[timeframe].map((score, index: any) => (
              <tr key={index + 1}>
                <td>{index + 1}.</td>
                <td>{score.playerName}</td>
                <td>{score.gameCompletionTime}</td>
              </tr>
            ))} */}
          {timeframe === "scoresToday" ? scores.scoresToday.map((score, index: any) => (
            <tr key={index + 1}>
              <td>{index + 1}.</td>
              <td>{score.playerName}</td>
              <td>{score.gameCompletionTime}</td>
            </tr>
          )) : null}
          {timeframe === "scoresThisWeek" ? scores.scoresThisWeek.map((score, index: any) => (
            <tr key={index + 1}>
              <td>{index + 1}.</td>
              <td>{score.playerName}</td>
              <td>{score.gameCompletionTime}</td>
            </tr>
          )) : null}
          {timeframe === "scoresThisMonth" ? scores.scoresThisMonth.map((score, index: any) => (
            <tr key={index + 1}>
              <td>{index + 1}.</td>
              <td>{score.playerName}</td>
              <td>{score.gameCompletionTime}</td>
            </tr>
          )) : null}
          {timeframe === "scoresAllTime" ? scores.scoresAllTime.map((score, index: any) => (
            <tr key={index + 1}>
              <td>{index + 1}.</td>
              <td>{score.playerName}</td>
              <td>{score.gameCompletionTime}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
}

export const AppProviders: React.FC = ({ children }) => (
  <TimeframeContextProvider>
    <ScoresContextProvider>
      {children}
    </ScoresContextProvider>
  </TimeframeContextProvider>
);
