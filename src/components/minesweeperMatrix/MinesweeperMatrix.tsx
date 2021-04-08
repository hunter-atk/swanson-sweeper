import React from 'react';
import { useContext, useEffect, useState } from 'react';

// components
import { Cell } from '../cell/Cell';

// contexts
import { GameDifficultyContext, GameStatsContext } from '../../contexts/index';

// styles
import './MinesweeperMatrix.sass';

export const MinesweeperMatrix: React.FC = () => {
  // const { gameDifficulty } = useContext(GameDifficultyContext);
  const { coinsGathered, totalCoins, setTotalCoins } = useContext(GameStatsContext);
  const [mineValues] = useState([...Array(9)].map(() => Array(9)));
  const [winMessage, setWinMessage] = useState("");

  // useEffect(() => {
  //   if (gameDifficulty) {
  //     if(gameDifficulty === 'beginner'){
  //       setMatrix()
  //     }
  //     return;
  //   }
  // }, [gameDifficulty])

  useEffect(() => {
    generateMines();
  }, [])

  useEffect(() => {
    if(coinsGathered){
      if(coinsGathered === totalCoins) setWinMessage("YOU WON!!!");
    }
  }, [coinsGathered])

  let rows = 9;
  let columns = 9;

  const generateMines = () => {
    let coinCount = 0;
    for (let i = 0; i < mineValues.length; i++) {
      for (let j = 0; j < mineValues[0].length; j++) {
        const randomFloat = Math.random();
        if (randomFloat > 0.22) { 
          coinCount++;
        };
        mineValues[i][j] = randomFloat < 0.22;
      }
    }
    setTotalCoins(coinCount);
  };

  return (
    <>
    <div className="mmMain">

      {Array.from(Array(rows), (e, row) => {
        return <div className="mmRowContainer" key={row}>
          {Array.from(Array(columns), (e, column) => {
            return <Cell keyValue={column} row={row} column={column} mine={mineValues[row][column]} />
          })}
        </div>
      })}

    </div>
    <div>Coins gathered: {coinsGathered}</div>
    <div>{winMessage}</div>
    </>
  );
}

// create context to store which row and which column to process
// create a queue to store matrix addresses that need to be processed
// Cell instances should listen to this. If the row and column matches, process the cell
// After processing the cell, add all of its surrounding cell addresses to the queue
// terminate when queue is empty
