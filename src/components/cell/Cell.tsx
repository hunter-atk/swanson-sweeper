import React from 'react';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';

// contexts
import { GameStatsContext } from '../../contexts/index';

// styles
import './Cell.sass';

interface IProps {
  keyValue: number;
  mine: boolean;
  row: number;
  column: number;
}

export const Cell: React.FC<IProps> = ({ keyValue, mine, row, column }) => {
  const { coinsGathered, setCoinsGathered } = useContext(GameStatsContext);
  const [clicked, setClicked] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const [surroundingMines, setSurroundingMines] = useState(-1);

  useEffect(() => {
    if (clicked || flagged || surroundingMines) {
      return;
    }
  }, [clicked, flagged, surroundingMines])
  
  const handleClick = (eventType: string) => {
    if(eventType === 'contextmenu' && !clicked){
      setFlagged(!flagged)
    } else if (!flagged) {
      console.log(mine)
      setClicked(true)
      if(!mine && !clicked){
        setCoinsGathered(coinsGathered + 1);
      }
    }
  }

  const displayClicked = !flagged && clicked;
  const displayFlagged = !clicked && flagged;
  const displayMine = clicked && !flagged && mine;

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
    />
  );
}
