import { countSurroundingMines } from './index';

export const populateNeighborValues = (data: any, width: number, height: number) => {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            countSurroundingMines(data, i, j, width, height);
        }
    }
    return data;
}