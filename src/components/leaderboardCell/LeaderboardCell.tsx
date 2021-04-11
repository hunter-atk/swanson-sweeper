import * as React from 'react';

// functions
import { getRank } from '../../functions/getRank';

// styles
import './LeaderboardCell.sass';

// props
interface IProps {
  cellIndex: number;
  rowIndex: number;
  winner: any;
}

export const LeaderboardCell: React.FC<IProps> = ({ cellIndex, rowIndex, winner}) => {
  const cellColors = ["#8aac76", "#acd1d6", "#f7dab2", "#fbf4a7", "#bea771", "#dc9b7a"]

  return (
    <div className="lbWinner" style={{ background: cellColors[rowIndex + cellIndex] ? cellColors[rowIndex + cellIndex] : cellColors[rowIndex + cellIndex - cellColors.length] }}>
      {winner && winner.playerName ? <div className="lbWinnerRank">{getRank(rowIndex, cellIndex)}</div> : null}
      <div>
        <h2>{winner && winner.gameCompletionTime ? `${winner.gameCompletionTime}s` : null}</h2>
        <p>
          {winner && winner.playerName ? winner.playerName : null}
        </p>
      </div>
    </div>
  );
};
