export const createDataMatrix = (width: number, height: number) => {
    let data = [] as any[];

    for (let i = 0; i < height; i++) {
        data.push([]);
        for (let j = 0; j < width; j++) {
            data[i][j] = {
                row: i,
                col: j,
                isMine: false,
                isFlagged: false,
                surroundingMines: 0,
                clicked: false
            }
        }
    }

    return data;
}