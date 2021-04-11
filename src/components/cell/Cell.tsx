import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useState } from 'react';

// styles
import './Cell.sass';

// props
interface Data {
  col: number;
  clicked: boolean;
  isMine: boolean;
  isFlagged: boolean;
  isRevealed: boolean;
  row: number;
  surroundingMines: number;
}

interface IProps {
  data: Data;
  handleClick: any;
  handleRightClick: any;
  keyValue: number;
}

export const Cell: React.FC<IProps> = ({ data, handleClick, handleRightClick, keyValue }) => {
  const [flaggedToggle, setFlaggedToggle] = useState(data.isFlagged);

  useEffect(() => {
    if (flaggedToggle) {
      return;
    }
  }, [flaggedToggle])



  return (
    <div key={keyValue} className={classNames(
      "cellMain",
      data.isFlagged ? "cellFlagged" : null,
      data.clicked ? "cellClicked" : null,
      data.clicked && !data.isFlagged && data.isMine ? "cellMine" : null,
      (data.row + data.col) % 2 ? "cellOdd" : "cellEven",
      data.isRevealed ? "cellRevealed" : null
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
