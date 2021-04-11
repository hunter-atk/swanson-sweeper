import * as React from 'react';
import classNames from 'classnames';
import { useContext } from 'react';

// contexts
import { ModalContext } from '../../contexts';

// components
import { Controls, Leaderboard, ScoreForm, Settings, WinMessage } from '../index';

// images
import CloseIcon from '../../assets/close.svg'

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
  } else if (type === 'scoreForm') {
    content = <ScoreForm />;
  }
  return (
    <div className={classNames("modal", type == 'winMessage' ? 'winMessage' : null)} onClick={() => type === 'intro' || type === 'controls' ? setType('') : null}>
      <div className="windowContainer">
        <div className="window">
          <img className={classNames("closeButton", type === 'controls' || type === 'intro' ? "hide" : null)} src={CloseIcon} onClick={() => setType('')} />
          <div className="content">{content}</div>
        </div>
      </div>
    </div>
  );
};
