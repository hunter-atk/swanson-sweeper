import React from 'react';
import { useContext } from 'react';

// contexts
import { ModalContext } from '../../contexts/index';

// styles
import './BackButton.sass';

export const BackButton: React.FC = () => {
  const { setType } = useContext(ModalContext);

  return (
    <div className="bbMain" onClick={() => setType('intro')}/>
  );
}
