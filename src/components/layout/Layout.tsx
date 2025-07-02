import React, { useEffect, useRef } from 'react';
import { Header } from '../header/Header';
import { InputWithImage } from '../inputWithImage/InputWithImage';
import { WeatherInfo } from '../weatherInfo/WeatherInfo';
import { HistoryList } from '../historyList/HistoryList';
import { StoreApp } from '../../store';
import { useSelector } from 'react-redux';
import { getCityByLocation } from '../../store/locationThunk';
import { useAppDispatch } from '../../store/hooks';
import { fetchWeatherRequest, setCurrentCity } from '../../store/city.slice';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
  const { city } = useParams<{ city?: string }>();
  const currentCity = useSelector(
    (state: StoreApp) => state.cities.currentCity,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialNavigated = useRef(false);
  useEffect(() => {
    const basePath = '/FinalProjectApp';
    const currentFullPath = location.pathname;

    if (
      !city &&
      currentCity &&
      !currentFullPath.includes(encodeURIComponent(currentCity))
    ) {
      const targetPath = `${basePath}/weather/${encodeURIComponent(currentCity)}`;
      console.log(
        `Layout (Initial Load): Navigating from ${currentFullPath} to ${targetPath}`,
      );
      navigate(targetPath, { replace: true });
    }
  }, [city, currentCity, navigate, location.pathname]);

  useEffect(() => {
    console.log('Layout: location changed:', location.pathname);
  }, [location]);

  useEffect(() => {
    if (city) {
      console.log('Layout: URL city param:', city);
      dispatch(setCurrentCity(decodeURIComponent(city)));
    }
  }, [city, dispatch]);

  useEffect(() => {
    if (!city && !currentCity) {
      console.log(
        'Layout: No city in URL or state, getting city by location...',
      );
      dispatch(getCityByLocation());
    }
  }, [city, currentCity, dispatch]);

  useEffect(() => {
    if (
      currentCity &&
      (!city ||
        decodeURIComponent(city).toLowerCase() !== currentCity.toLowerCase())
    ) {
      navigate(`/weather/${encodeURIComponent(currentCity)}`, {
        replace: false,
      });
    }
  }, [currentCity, city, navigate]);

  useEffect(() => {
    if (currentCity) {
      console.log('Layout: Fetching weather for', currentCity);
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
