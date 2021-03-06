import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IProps {
  type: '' | 'intro' | 'settings' | 'controls' | 'leaderboard' | 'winMessage' | 'scoreForm' ;
  setType: Dispatch<SetStateAction<'' | 'intro' | 'settings' | 'controls' | 'leaderboard' | 'winMessage' | 'scoreForm'>>;
}

export const ModalContext = createContext<IProps>({
  type: '',
  setType: () => {}
});

export const ModalContextProvider: React.FC = props => {
  const [type, setType] = useState<'' | 'intro' | 'settings' | 'controls' | 'leaderboard' | 'winMessage' | 'scoreForm' >('intro');

  const value = { type, setType };

  return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
};

export const ModalContextConsumer = ModalContext.Consumer;
