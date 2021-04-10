import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useState } from 'react';

// styles
import './Cell.sass';

interface Data {
  row: number;
  col: number,
  isMine: boolean;
  isFlagged: boolean;
  surroundingMines: number;
  isRevealed: boolean;
  clicked: boolean;
}

interface IProps {
  keyValue: number;
  data: Data;
  handleClick: any;
  handleRightClick: any;
}

export const Cell: React.FC<IProps> = ({ keyValue, data, handleClick, handleRightClick }) => {
  const [flaggedToggle, setFlaggedToggle] = useState(data.isFlagged);

  useEffect(() => {
    if (flaggedToggle) {
      return;
    }
  }, [flaggedToggle])



  return (
    <div key={keyValue} className={classNames(
      "cellMain",
      data.isFlagged ? "flagged" : null,
      data.clicked ? "clicked" : null,
      data.clicked && !data.isFlagged && data.isMine ? "mine" : null
    )}
      onClick={(e) => handleClick(data.row, data.col, e)}
      onContextMenu={(e) => {
        e.preventDefault();
        handleRightClick(data.row, data.col);
        setFlaggedToggle(!flaggedToggle);
      }}
    >
      {data.surroundingMines && data.isRevealed ? data.surroundingMines : null}
    </div>
  );
}
