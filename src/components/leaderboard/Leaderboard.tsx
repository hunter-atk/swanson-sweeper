import * as React from 'react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

// contexts
import { GameDifficultyContext, LeaderboardContext, ScoresContext } from '../../contexts'

// components
import { LeaderboardCell, LeaderboardSettings } from '../index';

// functions
import { generateLeaderboardCells } from '../../functions/index';

// styles
import './Leaderboard.sass';

export const Leaderboard: React.FC = () => {
  const { scores, setScores } = useContext(ScoresContext);
  const { gameDifficulty } = useContext(GameDifficultyContext);
  const { timeframe, difficultyLevel, setDifficultyLevel } = useContext(LeaderboardContext);
  const [winners, setWinners] = useState([[""], ["", ""], ["", "", ""], ["", "", "", ""], ["", "", "", "", ""]] as any[])

  useEffect(() => {
    setDifficultyLevel(gameDifficulty);
  }, [])

  useEffect(() => {
    if (difficultyLevel) {
      loadScores();
      const newWinners = generateLeaderboardCells(scores, timeframe);
      setWinners(newWinners);
    }
  }, [difficultyLevel])

  useEffect(() => {
    if (scores || timeframe) {
      const newWinners = generateLeaderboardCells(scores, timeframe);
      setWinners(newWinners);
      return;
    }
  }, [scores, timeframe])

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
    <div className="lbMain">
      <div className="lbPyramid">
        {winners ? winners.map((winnerRow, rowIndex) => (
          <div className="lbPyramidRow">
            {winnerRow.map((winner: any, cellIndex: number) => (
              <LeaderboardCell cellIndex={cellIndex} rowIndex={rowIndex} winner={winner} />
            ))}
          </div>
        )) : null}
        <LeaderboardSettings />
      </div>
    </div>
  );
};
