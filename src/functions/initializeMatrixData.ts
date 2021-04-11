import { addMines, createDataMatrix, populateNeighborValues } from './index'

export const initializeMatrixData = (width: number, height: number, mines: number) => {
    const matrixTemplate = createDataMatrix(width, height);
    const matrixWithMines = addMines(matrixTemplate, width, height, mines);
    const matrixWithNeighborValues = populateNeighborValues(matrixWithMines, width, height);

    return matrixWithNeighborValues;
}