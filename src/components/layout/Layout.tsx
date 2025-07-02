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
    // This effect runs only when:
    // 1. We are on the base '/weather' route (no city param)
    // 2. We have a 'currentCity' from Redux (meaning getCityByLocation has finished)
    // 3. The current URL path does NOT already contain the currentCity
    const basePath = '/FinalProjectApp'; // Make sure this matches your BrowserRouter basename
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
      // Use replace:true here, as this is effectively the "final" URL for this initial load
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
