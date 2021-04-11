import * as React from 'react';
import { useContext } from 'react';

// contexts
import { ModalContext, TimerContext } from '../../contexts'

// styles
import './WinMessage.sass';

export const WinMessage: React.FC = () => {
  const { setType } = useContext(ModalContext);
  const { secondsElapsed } = useContext(TimerContext);

  return (
    <div className="wmMain">
      <div className="wmDanceGif" />
      <h1 className="wmTitle">YOU GOT ALL THE GOLD IN {secondsElapsed} SECONDS!</h1>
      <div className="wmFormContainer">
        <button className="wmScore" onClick={() => {
          setType('scoreForm')
          return {}
        }}>Submit Score</button>
        <button className="wmRestart" onClick={() => {
          setType('')
          return {}
        }}>Play again!</button>
      </div>
    </div>
  );
};
