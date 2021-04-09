import React from 'react';
import { useContext, useEffect, useState } from 'react';

// components
import { MinesweeperMatrix } from '../../components'

// styles
// import './Board.sass';

export const Board: React.FC = () => {
  const [height, setHeight] = useState(8);
  const [width, setWidth] = useState(8);
  const [mines, setMines] = useState(10);

  return (
    <div className="boardMain">
      <MinesweeperMatrix height={height} width={width} mines={mines} />
    </div>
  );
}
