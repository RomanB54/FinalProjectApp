import React from 'react';
import { FC } from 'react';

type Props = {
  city: string;
  temperature: string;
  icon: string;
};

export const WeatherInfo: FC<Props> = ({ city, temperature, icon }) => {
  const sourceLink = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <div className="layer3">
      <p className="show-weather">Weather info</p>
      <ul className="info-weather">
        <li className="InfoCity">{city}</li>
        <li className="InfoTemp">{temperature}</li>
      </ul>
      <div className="icon-weather">
        <img src={sourceLink} />
      </div>
    </div>
  );
};
