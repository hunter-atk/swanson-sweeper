export const revealSurroundingMines = (data: any, row: number, column: number, width: number, height: number) => {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let i = 0; i < directions.length; i++) {
        let peekRow = data[row][column].row + directions[i][0];
        let peekColumn = data[row][column].col + directions[i][1];
        if (peekRow < 0 || peekRow >= height || peekColumn < 0 || peekColumn >= width) {
            continue;
        } else {
            if(data[peekRow][peekColumn].isFlagged) continue;
            data[peekRow][peekColumn].clicked = true;
            data[peekRow][peekColumn].isRevealed = true;
            if (data[peekRow][peekColumn].isMine) return true;
        }
    }
    return false;
}