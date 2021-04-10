import * as React from 'react';
import axios from 'axios';
import { useContext, useEffect } from 'react';

// contexts
import { GameDifficultyContext, LeaderboardContext, ModalContext, ScoresContext } from '../../contexts'

// styles
import './Leaderboard.sass';

export const Leaderboard: React.FC = () => {
  const { scores, setScores } = useContext(ScoresContext);
  const { setType } = useContext(ModalContext);
  const { gameDifficulty, setGameDifficulty } = useContext(GameDifficultyContext);
  const { timeframe, setTimeframe, difficultyLevel, setDifficultyLevel } = useContext(LeaderboardContext);

  useEffect(() => {
    setDifficultyLevel(gameDifficulty);
  }, [])

  useEffect(() => {
    if (difficultyLevel) {
      loadScores();
    }
  }, [difficultyLevel])

  useEffect(() => {
    if (scores || timeframe) {
      return;
    }
  }, [scores, timeframe])

  // loads records in leaderboard db
  const loadScores = async () => {
    try {
      const response = await axios.get(`https://glacial-eyrie-20134.herokuapp.com/api/scores/${difficultyLevel}`)
      const result = response.data;
      setScores(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="leaderboardMain">
      <div>
        <label>Game Difficulty:</label>
        <select name="difficulty" id="difficulty" value={difficultyLevel} onChange={e => setDifficultyLevel(e.target.value)}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <div>
        <label>Timeframe:</label>
        <select name="timeframe" id="timeframe" value={timeframe} onChange={e => setTimeframe(e.target.value)}>
          <option value="scoresToday">Today</option>
          <option value="scoresThisWeek">This Week</option>
          <option value="scoresThisMonth">This Month</option>
          <option value="scoresAllTime">All Time</option>
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>


          {/* TO-DO: Implement something like this code block below => keep it DRY
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
      <button onClick={() => {
        setType('')
        return {}
      }}>START GAME</button>
    </div>
  );
};
