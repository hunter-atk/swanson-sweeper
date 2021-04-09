export const addMines = (data: any[], width: number, height: number, mines: number) => {
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