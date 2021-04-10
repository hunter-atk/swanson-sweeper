import * as React from 'react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

// contexts
import { GameDifficultyContext, LeaderboardContext, ModalContext, ScoresContext } from '../../contexts'

// styles
import './Leaderboard.sass';

export const Leaderboard: React.FC = () => {
  const { scores, setScores } = useContext(ScoresContext);
  const { gameDifficulty } = useContext(GameDifficultyContext);
  const { timeframe, setTimeframe, difficultyLevel, setDifficultyLevel } = useContext(LeaderboardContext);
  const [winners, setWinners] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true);
  const cellColors = ["#8aac76", "#acd1d6", "#f7dab2", "#fbf4a7", "#bea771", "#dc9b7a"]

  useEffect(() => {
    setDifficultyLevel(gameDifficulty);
  }, [])

  useEffect(() => {
    if (difficultyLevel) {
      loadScores();
      generateCells();
    }
  }, [difficultyLevel])

  useEffect(() => {
    if (scores || timeframe) {
      generateCells();
      return;
    }
  }, [scores, timeframe])

  const generateCells = () => {
    setIsLoading(true);
    let scoreIndex = 0;

    const cells = [] as any;

    // TO-DO: need to figure out how to index an object with a string param in TypeScript. This loop is not DRY.
    for (let i = 0; i < 5; i++) {
      cells.push([]);
      for (let j = 0; j <= i; j++) {
        if (timeframe === 'scoresToday') {
          cells[i].push(scores.scoresToday[scoreIndex])
          scoreIndex++;
        } else if (timeframe === 'scoresThisWeek') {
          cells[i].push(scores.scoresThisWeek[scoreIndex])
          scoreIndex++;
        } else if (timeframe === 'scoresThisMonth') {
          cells[i].push(scores.scoresThisMonth[scoreIndex])
          scoreIndex++;
        } else {
          cells[i].push(scores.scoresAllTime[scoreIndex])
          scoreIndex++;
        }
      }
      setWinners(cells);
    }
    setIsLoading(false);
  }

  // loads records in leaderboard db
  const loadScores = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://glacial-eyrie-20134.herokuapp.com/api/scores/${difficultyLevel}`)
      const result = response.data;
      setScores(result);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="lbMain">
      <div className="lbPyramid">
        {!isLoading && winners ? winners.map((winnerRow, i) => (
          <div className="lbPyramidRow">
            {winnerRow.map((winner: any, j: number) => (
              <div className="lbWinner" style={{ background: cellColors[i + j] ? cellColors[i + j] : cellColors[i + j - cellColors.length] }}>
                {winner && winner.playerName ? <div className="lbWinnerRank">{((i + 1) * (i + 1) + j)}</div> : null}
                <div>
                  <h2>{winner && winner.gameCompletionTime ? `${winner.gameCompletionTime}s` : null}</h2>
                  <p>
                    {winner && winner.playerName ? winner.playerName : null}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )) : <div>Loading...</div>}
      </div>

      <div>
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
      </div>

    </div>
  );
};





{/* <table>
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>


          TO-DO: Implement something like this code block below => keep it DRY
            {scores[timeframe].map((score, index: any) => (
              <tr key={index + 1}>
                <td>{index + 1}.</td>
                <td>{score.playerName}</td>
                <td>{score.gameCompletionTime}</td>
              </tr>
            ))}
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
      </table> */}
