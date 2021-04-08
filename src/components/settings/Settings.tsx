import React from 'react';
import { useContext, useEffect } from 'react';

// contexts
import { GameDifficultyContext, TimeframeContext } from '../../contexts/index';

// styles
// import './Settings.sass';

export const Settings: React.FC = () => {
  const { gameDifficulty, setGameDifficulty } = useContext(GameDifficultyContext);
  const { timeframe, setTimeframe } = useContext(TimeframeContext);

  useEffect(() => {
    if (timeframe || gameDifficulty) {
      return;
    }
  }, [timeframe, gameDifficulty])


  return (
    <div>

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
    </div>
  );
}
