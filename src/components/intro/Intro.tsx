import * as React from 'react';

// images
import IntroImage from '../../assets/intro.png';

// styles
import './Intro.sass';

export const Intro: React.FC = () => {

  return (
    <img className="introMain" src={IntroImage}/>
  );
};
