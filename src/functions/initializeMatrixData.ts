import { createDataMatrix } from './createDataMatrix'
import { addMines } from './addMines'
import { populateNeighborValues } from './populateNeighborValues'

export const initializeMatrixData = (width: number, height: number, mines: number) => {
    const matrixTemplate = createDataMatrix(width, height);
    const matrixWithMines = addMines(matrixTemplate, width, height, mines);
    const matrixWithNeighborValues = populateNeighborValues(matrixWithMines, width, height);

    return matrixWithNeighborValues;
}