import * as React from 'react';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IProps {
  isLoading: Boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const IsLoadingContext = createContext<IProps>({
  isLoading: false,
  setIsLoading: () => {}
});

export const IsLoadingContextProvider: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const value = { isLoading, setIsLoading };

  return (
    <IsLoadingContext.Provider value={value}>
      {props.children}
    </IsLoadingContext.Provider>
  );
};

export const IsLoadingContextConsumer = IsLoadingContext.Consumer;