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

  const hasNavigated = useRef(false);

  useEffect(() => {
    if (hasNavigated.current) return;

    if (!city && !currentCity) {
      dispatch(getCityByLocation());
      return;
    }
    if (currentCity) {
      const urlCity = city ? decodeURIComponent(city).toLowerCase() : '';
      const reduxCity = currentCity.toLowerCase();

      if (urlCity !== reduxCity) {
        const basePath = '/FinalProjectApp';
        const targetPath = `${basePath}/weather/${encodeURIComponent(currentCity)}`;

        console.log(
          `Layout: Navigating from ${location.pathname} to ${targetPath}`,
        );
        navigate(targetPath, { replace: true });
        hasNavigated.current = true;
      } else {
        hasNavigated.current = true;
        dispatch(fetchWeatherRequest());
      }
    }
  }, [city, currentCity, dispatch, navigate, location.pathname]);

  useEffect(() => {
    if (city) {
      dispatch(setCurrentCity(decodeURIComponent(city)));
    }
  }, [city, dispatch]);

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
