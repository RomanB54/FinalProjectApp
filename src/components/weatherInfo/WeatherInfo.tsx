import React from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { StoreApp } from '../../store';

export const WeatherInfo: FC = () => {
  const { currentCity, temperature, icon, isLoading, error } = useSelector(
    (state: StoreApp) => state.cities,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentCity) return <div>Enter a city to see the weather.</div>;

  const sourceLink = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-card">
      <div className="header-page">Weather Information</div>
      <div className="icon-weather">
        <img src={sourceLink} />
      </div>
      <div className="show-weather">{temperature}</div>
      <ul className="info-weather">
        <li className="InfoCity">{currentCity}</li>
      </ul>
    </div>
  );
};
