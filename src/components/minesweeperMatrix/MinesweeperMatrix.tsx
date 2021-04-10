import React from 'react';
import { useContext, useEffect, useState } from 'react';

// functions
import { initializeMatrixData } from '../../functions/initializeMatrixData'

// components
import { Cell } from '../cell/Cell';

// contexts
import { GameStatsContext } from '../../contexts/index';

// styles
import './MinesweeperMatrix.sass';

// interface Data {
//   row: number;
//   col: number,
//   isMine: boolean;
//   isFlagged: boolean;
//   surroundingMines: number;
//   isRevealed: boolean;
//   clicked: boolean;
// }

interface IProps {
  height: number;
  width: number;
  mines: number;
}

export const MinesweeperMatrix: React.FC<IProps> = ({ height, width, mines }) => {
  const { gameStatus, setGameStatus } = useContext(GameStatsContext);
  const [dataMatrix, setDataMatrix] = useState([] as any[]);
  const [coinsGathered, setCoinsGathered] = useState(0);

  useEffect(() => {
    const newData = initializeMatrixData(width, height, mines);
    setDataMatrix(newData);
  }, [])

  useEffect(() => {
    if (coinsGathered) {
      console.log("COINS GATHERED")
      console.log(coinsGathered)
      if (coinsGathered === (height * width) - mines) {
        console.log("WINNERSFJKLSDJK")
        setGameStatus('won');
      }
      return
    }
  }, [coinsGathered])

  useEffect(() => {
    if(gameStatus){
      return
    }
  }, [gameStatus])

  const revealAllMines = () => {
    for (let i = 0; i < dataMatrix.length; i++) {
      for (let j = 0; j < dataMatrix[0].length; j++) {
        if (dataMatrix[i][j].isMine) dataMatrix[i][j].clicked = true;
      }
    }
  }

  const traverseAndReveal = (data: any, row: number, col: number) => {
    let coins = 0;
    const currentCell = dataMatrix[row][col];
    if(currentCell.isMine || currentCell.isFlagged || currentCell.clicked) return 0;
    currentCell.isRevealed = true;
    if (currentCell.surroundingMines) {
      currentCell.clicked = true;
      coins++;
      console.log("gather coin at: ", [row, col])
      return coins;
    } else {
      currentCell.clicked = true;
      coins++
      console.log("gather coin at: ", [row, col])
      const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      for (let i = 0; i < directions.length; i++) {
        let peekRow = currentCell.row + directions[i][0];
        let peekColumn = currentCell.col + directions[i][1];
        if (peekRow < 0 || peekRow >= height || peekColumn < 0 || peekColumn >= width) {
          continue;
        } else {
          coins += traverseAndReveal(data, peekRow, peekColumn);
        }
      }
    }
    return coins;
  }

  const handleClick = (row: number, col: number, event: React.MouseEvent) => {
    const currentCell = dataMatrix[row][col];

    if (gameStatus !== 'pending' || currentCell.clicked || currentCell.isFlagged) return;

    if (currentCell.isMine && !currentCell.isFlagged) {
      currentCell.clicked = true;
      setGameStatus('lost');
      revealAllMines();
      return;
    }

    currentCell.isRevealed = true;
    if(currentCell.surroundingMines) { 
      currentCell.clicked = true;
      const newCoinsGathered = coinsGathered + 1;
      setCoinsGathered(newCoinsGathered);
      console.log("gather coin at: ", [row, col])
    } else {
      setCoinsGathered(coinsGathered + traverseAndReveal(dataMatrix, row, col));
    }

    if (coinsGathered === height * width - mines) {
      setGameStatus('won');
    }
  };

  const handleRightClick = (row: number, col: number) => {
    const currentCell = dataMatrix[row][col];
    if (gameStatus !== 'pending' || currentCell.clicked) return;

    currentCell.isFlagged = !currentCell.isFlagged
  };

  if (dataMatrix.length < height || !dataMatrix[height - 1][width - 1]) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="mmMain">

        {Array.from(Array(height), (e, row) => {
          return <div className="mmRowContainer" key={row}>
            {Array.from(Array(width), (e, column) => {
              return <Cell keyValue={column} data={dataMatrix[row][column]} handleClick={handleClick} handleRightClick={handleRightClick} />
            })}
          </div>
        })}

      </div>
      <div>Coins gathered: {coinsGathered}</div>
      {/* <button onClick={() => {
        // setDataMatrix([]);
        setGameStatus('pending');
        initializeMatrixData(width, height, mines);
      }}>Reset</button> */}
      <div>
        {gameStatus === 'lost' ? 'YOU LOST!!!' : null}
        {gameStatus === 'won' ? 'YOU WIN!!!' : null}
      </div>
    </>
  );
}

// PLAN A
// create context to store which row and which column to process
// create a queue to store matrix addresses that need to be processed
// Cell instances should listen to this. If the row and column matches, process the cell
// After processing the cell, add all of its surrounding cell addresses to the queue
// terminate when queue is empty

// PLAN B
// create a 2D matrix to store cell data
// have cells listen to the data in the cell at their own address

