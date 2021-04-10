import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IProps {
  dataMatrix: any;
  setDataMatrix: Dispatch<SetStateAction<any>>
}

export const GameDataContext = createContext<IProps>({
  dataMatrix: [] as any,
  setDataMatrix: () => {}
});

export const GameDataContextProvider: React.FC = (props) => {
  const [dataMatrix, setDataMatrix] = useState([] as any);

  const value = { dataMatrix, setDataMatrix };

  return (
    <GameDataContext.Provider value={value}>
      {props.children}
    </GameDataContext.Provider>
  );
};

export const GameDataContextConsumer = GameDataContext.Consumer;