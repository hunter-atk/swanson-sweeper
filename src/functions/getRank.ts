export const getRank = (rowIndex: number, columnIndex: number) => {
    let rank;
    if (rowIndex === 0) {
        rank = 1;
    } else if (rowIndex === 1) {
        rank = columnIndex + 2;
    } else if (rowIndex === 2) {
        rank = (rowIndex + 2) + columnIndex;
    } else if (rowIndex === 3) {
        rank = (rowIndex + 4) + columnIndex;
    } else {
        rank = (rowIndex + 7) + columnIndex;
    }
    return rank;
}