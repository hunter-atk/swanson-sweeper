import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useContext, useState } from 'react';

// contexts
import { TimerContext } from '../../contexts/index';

// styles
import './TimeDisplay.sass';

export const TimeDisplay: React.FC = () => {
  const { secondsElapsed, setSecondsElapsed, timerRunning } = useContext(TimerContext);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(secondsElapsed => secondsElapsed + 1);
      }, 1000);
    } else if (!timerRunning && secondsElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsElapsed]);

  return (
    <div className="tdMain">
      <div className={classNames("tdBirdThought", !secondsElapsed ? "hide" : null)}>
        {secondsElapsed}<span>s</span>
      </div>
      <div className="tdBird" />
    </div>
  );
}
