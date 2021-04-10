import React from 'react';
import { useContext } from 'react';

// contexts
import { ModalContext } from '../../contexts'

// images
import LeaderboardSign from '../../assets/sign2.png';
import ControlsSign from '../../assets/sign3.png';
import SettingsSign from '../../assets/sign4.png';

// styles
import './MenuSign.sass';

export const MenuSign: React.FC = () => {
  const { setType } = useContext(ModalContext);

  return (
    <div className="menuMain">
      <img className="menuSign1" src={LeaderboardSign} onClick={() => setType('leaderboard')} />
      <img className="menuSign2" src={ControlsSign} onClick={() => setType('controls')}/>
      <img className="menuSign3" src={SettingsSign} onClick={() => setType('settings')} />
    </div>
  );
}
