import * as React from 'react';
import { useContext } from 'react';

// contexts
import { ModalContext } from '../../contexts';

// components
import { Controls, Leaderboard, Settings, WinMessage } from '../index';

// styles
import './Modal.sass';

interface IProps {}
export const Modal: React.FC<IProps> = ({}) => {
  const { type, setType } = useContext(ModalContext);

  if (type === '') {
    return null;
  }

  let content = <div />;

  if (type === 'controls') {
    content = <Controls />;
  } else if (type === 'settings') {
    content = <Settings />;
  } else if (type === 'leaderboard') {
    content = <Leaderboard />;
  } else if (type === 'winMessage') {
    content = <WinMessage />;
  }

  return (
    <div className="modal">
      <div className="windowContainer">
        <div className="window">
          <button className="closeButton" onClick={() => setType('')} />
          <div className="content">{content}</div>
        </div>
      </div>
    </div>
  );
};
