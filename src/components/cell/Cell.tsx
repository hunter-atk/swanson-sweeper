import React from 'react';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';

// contexts
import { GameStatsContext } from '../../contexts/index';

// styles
import './Cell.sass';

interface Data {
  row: number;
  col: number,
  isMine: boolean;
  isFlagged: boolean;
  surroundingMines: number;
}

interface IProps {
  keyValue: number;
  data: Data;
}

export const Cell: React.FC<IProps> = ({ keyValue, data }) => {
  const { coinsGathered, setCoinsGathered } = useContext(GameStatsContext);
  const [clicked, setClicked] = useState(false);
  const [flagged, setFlagged] = useState(false);

  useEffect(() => {
    if (clicked || flagged || data) {
      return;
    }
  }, [clicked, flagged, data])
  
  const handleClick = (eventType: string) => {
    if(eventType === 'contextmenu' && !clicked){
      setFlagged(!flagged)
    } else if (!flagged) {
      console.log(data.isMine)
      setClicked(true)
      if(!data.isMine && !clicked){
        setCoinsGathered(coinsGathered + 1);
      }
    }
  }

  const displayClicked = !flagged && clicked;
  const displayFlagged = !clicked && flagged;
  // const displayMine = data.isMine;
  const displayMine = clicked && !flagged && data.isMine;

  return (
    <div key={keyValue} className={classNames(
      "cellMain", 
      displayClicked ? "clicked" : null,
      displayFlagged ? "flagged" : null,
      displayMine ? "mine" : null
    )}
    onClick={(e) => handleClick(e.type)} 
    onContextMenu={(e) => {
      e.preventDefault();
      handleClick(e.type);
    }}
    >{data.surroundingMines}</div>
  );
}

// on click, if neighbor value is empty, recursively check/reveal surrounding cells
// on click, if neighbor value not empty, show surroundingMine value
