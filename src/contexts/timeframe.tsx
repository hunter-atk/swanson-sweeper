import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IProps {
  timeframe: string;
  setTimeframe: Dispatch<SetStateAction<string>>
}

export const TimeframeContext = createContext<IProps>({
  timeframe: '',
  setTimeframe: () => {}
});

export const TimeframeContextProvider: React.FC = (props) => {
  const [timeframe, setTimeframe] = useState('scoresToday');

  const value = { timeframe, setTimeframe };

  return (
    <TimeframeContext.Provider value={value}>
      {props.children}
    </TimeframeContext.Provider>
  );
};

export const TimeframeContextConsumer = TimeframeContext.Consumer;