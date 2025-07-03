import React, { useEffect } from 'react';
import { Header } from '../header/Header';
import { InputWithImage } from '../inputWithImage/InputWithImage';
import { WeatherInfo } from '../weatherInfo/WeatherInfo';
import { HistoryList } from '../historyList/HistoryList';
import { StoreApp } from '../../store';
import { useSelector } from 'react-redux';
import { getCityByLocation } from '../../store/locationThunk';
import { useAppDispatch } from '../../store/hooks';
import {
  addCityName,
  fetchWeatherRequest,
  setCurrentCity,
} from '../../store/city.slice';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
  const { currentCity: currentCityParam } = useParams<{
    currentCity?: string;
  }>();
  const currentCity = useSelector(
    (state: StoreApp) => state.cities.currentCity,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentCityParam) {
      const decodedCity = decodeURIComponent(currentCityParam);
      if (decodedCity.toLowerCase() !== (currentCity || '').toLowerCase()) {
        dispatch(setCurrentCity(decodedCity));
        dispatch(addCityName(decodedCity));
        dispatch(fetchWeatherRequest())
      }
    }
  }, [currentCityParam, dispatch]);

  useEffect(() => {
    if (!currentCityParam && !currentCity) {
      dispatch(getCityByLocation());
    }
  }, [currentCityParam, currentCity]);

  useEffect(() => {
    if (currentCity) {
      dispatch(fetchWeatherRequest());
    }
  }, [currentCity]);

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
