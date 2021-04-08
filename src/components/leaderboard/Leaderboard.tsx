import React from 'react';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import './Leaderboard.sass';

// contexts
import { TimeframeContext, TimeframeContextProvider, ScoresContext, ScoresContextProvider } from '../../contexts/index';


export const Leaderboard: React.FC = () => {
  const { scores, setScores } = useContext(ScoresContext);
  const { timeframe, setTimeframe } = useContext(TimeframeContext);
  const [playerName, setPlayerName] = useState('');
  const [gameCompletionTime, setGameCompletionTime] = useState(Infinity);
  const [gameDifficulty, setGameDifficulty] = useState('beginner');

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadScores();
  }, [])

  useEffect(() => {
    if (gameDifficulty) {
      loadScores();
      setGameCompletionTime(0);
    }
  }, [gameDifficulty])

  useEffect(() => {
    if (scores || timeframe) {
      return;
    }
  }, [scores, timeframe])


  // loads records in leaderboard db
  const loadScores = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://glacial-eyrie-20134.herokuapp.com/api/scores/${gameDifficulty}`)
      const result = response.data;
      setScores(result);
    } catch (error) {
      console.log(error.message);
    }

    setIsLoading(false);
  }


  // handles leaderboard entry submit
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    const newScore = {
      playerName,
      gameCompletionTime,
      gameDifficulty
    };

    try {
      const response = await axios.post(`https://glacial-eyrie-20134.herokuapp.com/api/scores`, newScore)
      console.log(response);
      console.log(response.data);

      setIsComplete(true);
      loadScores();
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  }

  return (
    <div>
      <div>
        {isLoading ? "Loading" : "NOT Loading"}
        {errorMessage ? <p>{errorMessage}</p> : null}
        {isComplete ? <p>Score Submitted!</p> : null}
      </div>

      <div>
        <label>Game Difficulty:</label>
        <select name="difficulty" id="difficulty" onChange={e => setGameDifficulty(e.target.value)}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <div>
        <label>Timeframe:</label>
        <select name="timeframe" id="timeframe" onChange={e => setTimeframe(e.target.value)}>
          <option value="scoresToday">Today</option>
          <option value="scoresThisWeek">This Week</option>
          <option value="scoresThisMonth">This Month</option>
          <option value="scoresAllTime">All Time</option>
        </select>
      </div>

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
              <tr>
                <td>{index}.</td>
                <td>{score.playerName}</td>
                <td>{score.gameCompletionTime}</td>
              </tr>
            ))} */}
            {timeframe === "scoresToday" ? scores.scoresToday.map((score, index: any) => (
              <tr>
                <td>{index + 1}.</td>
                <td>{score.playerName}</td>
                <td>{score.gameCompletionTime}</td>
              </tr>
            )) : null}
            {timeframe === "scoresThisWeek" ? scores.scoresThisWeek.map((score, index: any) => (
              <tr>
                <td>{index + 1}.</td>
                <td>{score.playerName}</td>
                <td>{score.gameCompletionTime}</td>
              </tr>
            )) : null}
            {timeframe === "scoresThisMonth" ? scores.scoresThisMonth.map((score, index: any) => (
              <tr>
                <td>{index + 1}.</td>
                <td>{score.playerName}</td>
                <td>{score.gameCompletionTime}</td>
              </tr>
            )) : null}
            {timeframe === "scoresAllTime" ? scores.scoresAllTime.map((score, index: any) => (
              <tr>
                <td>{index + 1}.</td>
                <td>{score.playerName}</td>
                <td>{score.gameCompletionTime}</td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Player Name:
            <input type="text" name="name" onChange={e => setPlayerName(e.target.value)} />
          </label>
          <label>
            Game Duration:
            <input type="number" name="duration" onChange={e => setGameCompletionTime(Number(e.target.value))} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
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
