import React from 'react';

// images
import LeaderboardSign from '../../assets/sign2.png';
import ControlsSign from '../../assets/sign3.png';
import SettingsSign from '../../assets/sign4.png';

// styles
import './MenuSign.sass';

export const MenuSign: React.FC = () => {

  return (
    <div className="menuMain">
      <img className="menuSign1" src={LeaderboardSign} />
      <img className="menuSign2" src={ControlsSign} />
      <img className="menuSign3" src={SettingsSign} />
    </div>
  );
}
