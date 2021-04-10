import React from 'react';
import { useContext } from 'react';

// contexts
import { TimerContext } from '../../contexts/index';

// styles
import './TimeDisplay.sass';

export const TimeDisplay: React.FC = () => {
  const { secondsElapsed, setSecondsElapsed, timerRunning } = useContext(TimerContext);

  while(timerRunning){
    setTimeout(() => {
      setSecondsElapsed(secondsElapsed + 1);
    }, 1000);
  }

  return (
    <div className="tdMain">
      <div className="tdBirdThought">
        {secondsElapsed}
      </div>
      <div className="tdBird" />
    </div>
  );
}
