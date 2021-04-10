import React from 'react';
import { useContext } from 'react';

// components
import { MinesweeperMatrix } from '../../components'

// contexts
import { GameDifficultyContext } from '../../contexts/index';

// styles
// import './Board.sass';

export const Board: React.FC = () => {
  const { gameDifficulty } = useContext(GameDifficultyContext);

  return (
    <div className="boardMain">
      { gameDifficulty === 'beginner' ? <MinesweeperMatrix height={9} width={9} mines={10} /> : null}
      { gameDifficulty === 'intermediate' ? <MinesweeperMatrix height={16} width={16} mines={40} /> : null}
      { gameDifficulty === 'expert' ? <MinesweeperMatrix height={16} width={25} mines={82} /> : null}
    </div>
  );
}
