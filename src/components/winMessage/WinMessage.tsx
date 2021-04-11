import * as React from 'react';
import classNames from 'classnames';
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
      <div className="wmFormContainer">
        <div className={classNames("wmButtonContainer", "right")}>
          <div className="wmScore" onClick={() => {
            setType('scoreForm')
            return {}
          }}/>
        </div>
        <div className={classNames("wmButtonContainer", "left")}>
          <div className="wmRestart" onClick={() => {
            setType('')
            return {}
          }}/>
        </div>
      </div>
    </div>
  );
};
