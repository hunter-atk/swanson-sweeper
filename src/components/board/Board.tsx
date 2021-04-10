import React from 'react';
import { useContext } from 'react';

// components
import { MinesweeperMatrix } from '../../components'

// contexts
import { GameDifficultyContext } from '../../contexts/index';

// styles
import './Board.sass';

interface IProps {
  width: number;
  height: number;
  mines: number
}

export const Board: React.FC<IProps> = ({ width, height, mines}) => {
  const { gameDifficulty } = useContext(GameDifficultyContext);

  return (
    <div className="boardMain">
      <MinesweeperMatrix height={height} width={width} mines={mines} /> 
      {/* { gameDifficulty === 'beginner' ? <MinesweeperMatrix height={9} width={9} mines={5} /> : null}
      { gameDifficulty === 'intermediate' ? <MinesweeperMatrix height={12} width={21} mines={40} /> : null}
      { gameDifficulty === 'expert' ? <MinesweeperMatrix height={16} width={25} mines={72} /> : null} */}
    </div>
  );
}
