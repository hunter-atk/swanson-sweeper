import * as React from 'react';
import { useContext } from 'react';

// contexts
import { ModalContext } from '../../contexts'

// styles
import './Controls.sass';

export const Controls: React.FC = () => {
  const { setType } = useContext(ModalContext);

  return (
    <div className="controlsMain">
      <button onClick={() => {
        setType('')
        return {}
      }}>START GAME</button>
    </div>
  );
};
