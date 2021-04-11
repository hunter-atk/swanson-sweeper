import React from 'react';
import { useContext, useEffect, useState } from 'react';

// functions
import { initializeMatrixData, revealAllMines, traverseAndReveal } from '../../functions/index';

// components
import { Cell } from '../cell/Cell';

// contexts
import { GameDataContext, GameStatsContext, ModalContext, TimerContext } from '../../contexts/index';

// styles
import './MinesweeperMatrix.sass';

interface IProps {
  height: number;
  width: number;
  mines: number;
}

export const MinesweeperMatrix: React.FC<IProps> = ({ height, width, mines }) => {
  const { dataMatrix, setDataMatrix } = useContext(GameDataContext);
  const { gameStatus, setGameStatus, coinsGathered, setCoinsGathered } = useContext(GameStatsContext);
  const { setSecondsElapsed, setTimerRunning } = useContext(TimerContext);
  const { setType } = useContext(ModalContext);

  useEffect(() => {
    resetBoard();
  }, [])

  useEffect(() => {
    if (coinsGathered === (height * width) - mines) {
      setGameStatus('won');
      setTimerRunning(false);
      setType('winMessage');
    }
  }, [coinsGathered])

  const resetBoard = () => {
    setSecondsElapsed(0);
    setTimerRunning(false);
    setType('');
    const newData = initializeMatrixData(width, height, mines);
    setDataMatrix(newData);
    setGameStatus('pending');
    setCoinsGathered(0);
  }

  const endLostGame = (currentCell: any) => {
    currentCell.clicked = true;
    setTimerRunning(false);
    setGameStatus('lost');
    revealAllMines(dataMatrix);
  }

  const revealSurroundingMines = (row: number, column: number) => {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const startingCell = dataMatrix[row][column];
    let accumulatedCoins = 0;
    for (let i = 0; i < directions.length; i++) {
      let peekRow = startingCell.row + directions[i][0];
      let peekColumn = startingCell.col + directions[i][1];

      if (peekRow < 0 || peekRow >= height || peekColumn < 0 || peekColumn >= width) {
        continue;
      }

      const currentCell = dataMatrix[peekRow][peekColumn];
      if (currentCell.isFlagged || currentCell.clicked) continue;
      if (currentCell.isMine && !currentCell.isFlagged) {
        currentCell.clicked = true;
        endLostGame(currentCell);
        return;
      }
      
      if (currentCell.surroundingMines) {
        accumulatedCoins++;
        currentCell.clicked = true;
        currentCell.isRevealed = true;
      } else {
        accumulatedCoins += traverseAndReveal(dataMatrix, peekRow, peekColumn, width, height);
      }

    }
    return accumulatedCoins;
  }

  const handleClick = (row: number, col: number) => {
    setTimerRunning(true);
    const currentCell = dataMatrix[row][col];

    if (gameStatus !== 'pending') {
      resetBoard();
      return;
    }

    if (currentCell.isFlagged) return;

    if (currentCell.isMine && !currentCell.isFlagged) {
      endLostGame(currentCell);
      return;
    }

    if (currentCell.clicked && !currentCell.isFlagged && currentCell.surroundingMines) {
      let newCoinsGathered = revealSurroundingMines(row, col) || 0;
      newCoinsGathered += coinsGathered;
      setCoinsGathered(newCoinsGathered);
    } else {
      currentCell.isRevealed = true;

      if (currentCell.surroundingMines) {
        currentCell.clicked = true;
        const newCoinsGathered = coinsGathered + 1;
        setCoinsGathered(newCoinsGathered);
      } else {
        setCoinsGathered(coinsGathered + traverseAndReveal(dataMatrix, row, col, width, height));
      }
    }

    if (coinsGathered === height * width - mines) {
      setGameStatus('won');
      setTimerRunning(false);
    }
  };

  const handleRightClick = (row: number, col: number) => {
    setTimerRunning(true);
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

