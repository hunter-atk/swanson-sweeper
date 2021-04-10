import React from 'react';
import { useContext, useEffect, useState } from 'react';

// functions
import { initializeMatrixData } from '../../functions/initializeMatrixData'
import { traverseAndReveal } from '../../functions/traverseAndReveal'
import { revealAllMines } from '../../functions/revealAllMines'

// components
import { Cell } from '../cell/Cell';

// contexts
import { GameStatsContext } from '../../contexts/index';

// styles
import './MinesweeperMatrix.sass';

interface IProps {
  height: number;
  width: number;
  mines: number;
}

export const MinesweeperMatrix: React.FC<IProps> = ({ height, width, mines }) => {
  const { gameStatus, setGameStatus, coinsGathered, setCoinsGathered } = useContext(GameStatsContext);
  const [dataMatrix, setDataMatrix] = useState([] as any[]);

  useEffect(() => {
    resetBoard();
  }, [])

  useEffect(() => {
    if (coinsGathered === (height * width) - mines) {
      setGameStatus('won');
    }
  }, [coinsGathered])

  const resetBoard = () => {
    const newData = initializeMatrixData(width, height, mines);
    setDataMatrix(newData);
    setGameStatus('pending');
    setCoinsGathered(0);
  }

  const handleClick = (row: number, col: number) => {
    const currentCell = dataMatrix[row][col];

    if (gameStatus !== 'pending') {
      resetBoard();
      return;
    }

    if (currentCell.clicked || currentCell.isFlagged) return;

    if (currentCell.isMine && !currentCell.isFlagged) {
      currentCell.clicked = true;
      setGameStatus('lost');
      revealAllMines(dataMatrix);
      return;
    }

    currentCell.isRevealed = true;

    if (currentCell.surroundingMines) {
      currentCell.clicked = true;
      const newCoinsGathered = coinsGathered + 1;
      setCoinsGathered(newCoinsGathered);
    } else {
      setCoinsGathered(coinsGathered + traverseAndReveal(dataMatrix, row, col, width, height));
    }

    if (coinsGathered === height * width - mines) {
      setGameStatus('won');
    }
  };

  const handleRightClick = (row: number, col: number) => {
    const currentCell = dataMatrix[row][col];

    if (gameStatus !== 'pending') {
      resetBoard();
      return;
    }

    if (currentCell.clicked) return;

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
      {/* <div>
        {gameStatus === 'lost' ? 'YOU LOST!!!' : null}
        {gameStatus === 'won' ? 'YOU WIN!!!' : null}
      </div>
      <button onClick={() => resetBoard()}>Reset</button> */}
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
// have cells listen to data changes in the cell at their own address

