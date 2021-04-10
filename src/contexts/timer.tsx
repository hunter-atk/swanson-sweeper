import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IProps {
  secondsElapsed: number;
  timerRunning: boolean;
  setSecondsElapsed: Dispatch<SetStateAction<number>>
  setTimerRunning: Dispatch<SetStateAction<boolean>>
}

export const TimerContext = createContext<IProps>({
  secondsElapsed: 0,
  timerRunning: false,
  setSecondsElapsed: () => {},
  setTimerRunning: () => {}
});

export const TimerContextProvider: React.FC = (props) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const value = { secondsElapsed, setSecondsElapsed, timerRunning, setTimerRunning };

  return (
    <TimerContext.Provider value={value}>
      {props.children}
    </TimerContext.Provider>
  );
};

export const TimerContextConsumer = TimerContext.Consumer;