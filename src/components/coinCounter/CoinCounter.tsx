import React from 'react';
import { useContext } from 'react';

// contexts
import { GameStatsContext } from '../../contexts/index';

// styles
import './CoinCounter.sass';

export const CoinCounter: React.FC = () => {
  const { coinsGathered } = useContext(GameStatsContext);

  return (
    <div className="ccMain">{coinsGathered}</div>
  );
}
