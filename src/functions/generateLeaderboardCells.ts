export const generateLeaderboardCells = (scores: any, timeframe: String) => {

    let scoreIndex = 0;
    const cells = [] as any;

    // TO-DO: need to figure out how to index an object with a string param in TypeScript. This loop is not DRY.
    for (let i = 0; i < 5; i++) {
        cells.push([]);
        for (let j = 0; j <= i; j++) {
            if (timeframe === 'scoresToday') {
                cells[i].push(scores.scoresToday[scoreIndex])
                scoreIndex++;
            } else if (timeframe === 'scoresThisWeek') {
                cells[i].push(scores.scoresThisWeek[scoreIndex])
                scoreIndex++;
            } else if (timeframe === 'scoresThisMonth') {
                cells[i].push(scores.scoresThisMonth[scoreIndex])
                scoreIndex++;
            } else {
                cells[i].push(scores.scoresAllTime[scoreIndex])
                scoreIndex++;
            }
        }
    }

    return cells;
}