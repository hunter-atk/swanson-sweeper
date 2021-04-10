export const revealAllMines = (dataMatrix: any) => {
    for (let i = 0; i < dataMatrix.length; i++) {
        for (let j = 0; j < dataMatrix[0].length; j++) {
            if (dataMatrix[i][j].isMine) dataMatrix[i][j].clicked = true;
        }
    }
}