import React from 'react';
import { Header } from '../header/Header';

export const About: React.FC = () => {
  return (
    <>
      <Header text={'About Whether APP'} size={1} className={'header'} />
      <div className="about-block">
        The project was developed during JAVASCRIPT BASIC course on OTUS
        platform
      </div>
    </>
  );
};

export default About;
