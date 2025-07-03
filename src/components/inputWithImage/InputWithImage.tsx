import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreApp } from '../../store';
import { addCityName } from '../../store/city.slice';
import { YANDEX_MAPS_API_KEY } from '../../config';
import { useNavigate } from 'react-router-dom';

export const InputWithImage: React.FC = () => {
  const { coordinates } = useSelector((state: StoreApp) => state.cities);
  const [value, setValue] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleCity = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if (value.trim() === '') return;
    navigate(`/weather/${encodeURIComponent(value.trim())}`);
    setValue('');
  };

  const imgUrl = `https://static-maps.yandex.ru/v1?lang=ru_RU&ll=${coordinates.toString()}&spn=0.3,0.3&size=400,400&apikey=${YANDEX_MAPS_API_KEY}`;
  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };
  const handleKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleCity(ev as any as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <div className="weather-card city-input-section">
      <input
        className="input-for-city"
        type="text"
        placeholder="Enter city..."
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
      />
      <button
        className="button-enter"
        onClick={handleCity}
        disabled={value.trim() === ''}
      >
        Submit
      </button>
      <img className="map-city" src={imgUrl} alt="Map" />
    </div>
  );
};
