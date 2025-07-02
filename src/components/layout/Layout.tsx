import React, { useEffect } from 'react';
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
  const location = useLocation();
  const navigate = useNavigate();
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
    console.log('Layout: Redux currentCity:', currentCity, 'URL city:', city);
    if (
      currentCity &&
      (!city ||
        decodeURIComponent(city).toLowerCase() !== currentCity.toLowerCase())
    ) {
      const targetPath = `/weather/${encodeURIComponent(currentCity)}`;
      console.log(`Layout: Navigating to ${targetPath}`);
      navigate(targetPath, { replace: false });
      // navigate(`/weather/${encodeURIComponent(currentCity)}`, {
      //   replace: false,
      // })
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
