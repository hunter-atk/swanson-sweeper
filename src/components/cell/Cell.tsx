import React from 'react';
import classNames from 'classnames';

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
        handleRightClick(data.row, data.col)
        console.log(data.isFlagged)
      }}
    >
      {data.surroundingMines && data.isRevealed ? data.surroundingMines : null}
    </div>
  );
}
