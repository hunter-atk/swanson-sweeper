import * as React from 'react';
import { useContext, useEffect } from 'react';

// contexts
import { GameDifficultyContext, LeaderboardContext } from '../../contexts'

// styles
import './LeaderboardSettings.sass';

export const LeaderboardSettings: React.FC = () => {
  const { gameDifficulty } = useContext(GameDifficultyContext);
  const { timeframe, setTimeframe, difficultyLevel, setDifficultyLevel } = useContext(LeaderboardContext);

  useEffect(() => {
    setDifficultyLevel(gameDifficulty);
  }, [])

  return (
    <div className="lbsMain">
      <div>
        <label className="lbsText">Difficulty:</label>
        <select className="lbsSelect" name="difficulty" id="difficulty" value={difficultyLevel} onChange={e => setDifficultyLevel(e.target.value)}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <div>
        <label className="lbsText">Timeframe:</label>
        <select className="lbsSelect" name="timeframe" id="timeframe" value={timeframe} onChange={e => setTimeframe(e.target.value)}>
          <option value="scoresToday">Today</option>
          <option value="scoresThisWeek">This Week</option>
          <option value="scoresThisMonth">This Month</option>
          <option value="scoresAllTime">All Time</option>
        </select>
      </div>
    </div>
  );
};
