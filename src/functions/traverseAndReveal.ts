export const traverseAndReveal = (dataMatrix: any, row: number, col: number, width: number, height: number) => {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const currentCell = dataMatrix[row][col];
    let coins = 0;

    if (currentCell.isMine || currentCell.isFlagged || currentCell.clicked) return 0;

    currentCell.isRevealed = true;

    if (currentCell.surroundingMines) {
        currentCell.clicked = true;
        coins++;
        return coins;

    } else {
        currentCell.clicked = true;
        coins++

        for (let i = 0; i < directions.length; i++) {
            let peekRow = currentCell.row + directions[i][0];
            let peekColumn = currentCell.col + directions[i][1];
            if (peekRow < 0 || peekRow >= height || peekColumn < 0 || peekColumn >= width) {
                continue;
            } else {
                coins += traverseAndReveal(dataMatrix, peekRow, peekColumn, width, height);
            }
        }
    }

    return coins;
}