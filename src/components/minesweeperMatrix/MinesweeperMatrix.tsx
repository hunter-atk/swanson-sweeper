import React from 'react';
import { useContext, useEffect, useState } from 'react';

// components
import { Cell } from '../cell/Cell';

// contexts
// import { GameDifficultyContext, GameStatsContext } from '../../contexts/index';

// styles
import './MinesweeperMatrix.sass';

interface IProps {
  height: number;
  width: number;
  mines: number;
}

export const MinesweeperMatrix: React.FC<IProps> = ({ height, width, mines }) => {
  const [coinsGathered, setCoinsGathered] = useState(0);
  const [dataMatrix, setDataMatrix] = useState([] as any[]);
  const [winMessage, setWinMessage] = useState("");

  useEffect(() => {
    initializeMatrixData();
  }, [])

  useEffect(() => {
    if (coinsGathered) {
      if (coinsGathered === (height * width) - mines) setWinMessage("YOU WON!!!");
    }
  }, [coinsGathered])

  useEffect(() => {
    if(dataMatrix){
      console.log(dataMatrix);
      return
    }
  }, [dataMatrix])

  const initializeMatrixData = () => {
    const matrixTemplate = createDataMatrix();
    const matrixWithMines = addMines(matrixTemplate);
    const matrixWithNeighborValues = populateNeighborValues(matrixWithMines);
    console.log(matrixWithNeighborValues)
    setDataMatrix(matrixWithNeighborValues);
  }

  const createDataMatrix = () => {
    let data = [] as any[];

    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          row: i,
          col: j,
          isMine: false,
          isFlagged: false,
          surroundingMines: 0
        }
      }
    }

    return data;
  }

  const addMines = (data: any[]) => {
    let randomRow = 0, randomColumn = 0, minesAdded = 0

    while (minesAdded < mines) {
      randomRow = Math.floor(Math.random() * height);
      randomColumn = Math.floor(Math.random() * width);
      if (!data[randomRow][randomColumn].isMine) {
        data[randomRow][randomColumn].isMine = true;
        minesAdded++;
      }
    }

    return data;
  };

  const countSurroundingMines = (data: any, row: number, column: number) => {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    let currentSurroundingMineCount = 0;
    for(let i = 0; i < directions.length; i++){
      let peekRow = data[row][column].row + directions[i][0];
      let peekColumn = data[row][column].col + directions[i][1];
      if(peekRow < 0 || peekRow >= height || peekColumn < 0 || peekColumn >= width) {
        console.log("Not valid address: ", [peekRow, peekColumn])
      } else {
        if(data[peekRow][peekColumn].isMine) currentSurroundingMineCount++;
      }
    }
    data[row][column].surroundingMines = currentSurroundingMineCount;
  }

  const populateNeighborValues = (data: any) => {
    for(let i = 0; i < height; i++){
      for(let j = 0; j < width; j++){
        countSurroundingMines(data, i, j);
      }
    }
    return data;
  }

  if(dataMatrix.length < height || !dataMatrix[height - 1][width - 1]){
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="mmMain">

        {Array.from(Array(height), (e, row) => {
          return <div className="mmRowContainer" key={row}>
            {Array.from(Array(width), (e, column) => {
              return <Cell keyValue={column} data={dataMatrix[row][column]} />
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
