import * as React from 'react';
import { useContext } from 'react';

// contexts
import { GameDifficultyContext } from '../../contexts'

// styles
import './Settings.sass';

export const Settings: React.FC = () => {
  const { gameDifficulty, setGameDifficulty } = useContext(GameDifficultyContext);

  return (
    <div className="settingsMain">
      <div className="settingsContainer">
        <div className="settingsTitle">Game Difficulty:</div>
        <select className="settingsSelect" name="difficulty" id="difficulty" value={gameDifficulty} onChange={e => setGameDifficulty(e.target.value)}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>
    </div>
  );
};
