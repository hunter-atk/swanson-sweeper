import React from 'react';
import { useContext } from 'react';

// components
import { MinesweeperMatrix } from '../../components'

// styles
import './Board.sass';

// props
interface IProps {
  height: number;
  mines: number;
  width: number;
}

export const Board: React.FC<IProps> = ({ height, mines, width}) => {

  return (
    <div className="boardMain">
      <MinesweeperMatrix height={height} width={width} mines={mines} /> 
    </div>
  );
}
