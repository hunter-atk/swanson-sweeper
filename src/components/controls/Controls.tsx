import * as React from 'react';

// images
import ControlsImage from '../../assets/controls.png';

// styles
import './Controls.sass';

export const Controls: React.FC = () => {

  return (
    <img className="controlsMain" src={ControlsImage}/>
  );
};
