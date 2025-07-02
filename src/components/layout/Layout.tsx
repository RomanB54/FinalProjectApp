import React, { useEffect } from 'react';
import { Header } from '../header/Header';
import { InputWithImage } from '../inputWithImage/InputWithImage';
import { WeatherInfo } from '../weatherInfo/WeatherInfo';
import { HistoryList } from '../historyList/HistoryList';
import { StoreApp } from '../../store';
import { useSelector } from 'react-redux';
import { getCityByLocation } from '../../store/locationThunk';
import { useAppDispatch } from '../../store/hooks';
import { fetchWeatherRequest } from '../../store/city.slice';
import { useParams, useNavigate } from 'react-router-dom';

export const Layout: React.FC = () => {
  const { city } = useParams<{ city?: string }>();
  const currentCity = useSelector(
    (state: StoreApp) => state.cities.currentCity,
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!city && !currentCity) {
      dispatch(getCityByLocation());
    }
  }, []);

  useEffect(() => {
    if (currentCity && currentCity !== city) {
      navigate(`/weather/${encodeURIComponent(currentCity)}`, {
        replace: false,
      });
    }
  }, [currentCity, city, navigate]);

  useEffect(() => {
    if (currentCity) {
      dispatch(fetchWeatherRequest());
    }
  }, [currentCity, dispatch]);

  return (
    <>
      <Header text={'Weather Information APP'} size={1} className={'header'} />
      <div className="weather-layout">
        <InputWithImage />
        <WeatherInfo />
        <HistoryList />
      </div>
    </>
  );
};

export default Layout;
