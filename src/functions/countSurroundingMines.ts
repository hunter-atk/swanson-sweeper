export const countSurroundingMines = (data: any, row: number, column: number, width: number, height: number) => {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    let currentSurroundingMineCount = 0;
    for (let i = 0; i < directions.length; i++) {
        let peekRow = data[row][column].row + directions[i][0];
        let peekColumn = data[row][column].col + directions[i][1];
        if (peekRow < 0 || peekRow >= height || peekColumn < 0 || peekColumn >= width) {
            continue;
        } else {
            if (data[peekRow][peekColumn].isMine) currentSurroundingMineCount++;
        }
    }
    data[row][column].surroundingMines = currentSurroundingMineCount;
}