import * as React from 'react';
import { useContext } from 'react';

// components
import { ScoreForm } from '../index';

// contexts
import { ModalContext, TimerContext } from '../../contexts'

// styles
import './WinMessage.sass';

export const WinMessage: React.FC = () => {
  const { setType } = useContext(ModalContext);
  const { secondsElapsed } = useContext(TimerContext);

  return (
    <div className="wmMain">
      <h1>YOU DID IT in {secondsElapsed} seconds!</h1>
      <ScoreForm />
      <button onClick={() => {
        setType('')
        return {}
      }}>START ANOTHER GAME</button>
    </div>
  );
};
