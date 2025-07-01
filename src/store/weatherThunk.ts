import { Middleware } from '@reduxjs/toolkit';
import { StoreApp, AppActions } from '.';
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from './city.slice';
import { OPENWEATHER_API_KEY } from '../config';
import { isAppAction } from './historyMiddleware';

export const weatherMiddleware: Middleware<AppActions, StoreApp> =
  (store) => (next) => async (action) => {
    if (!isAppAction(action)) {
      return next(action);
    }
    const result = next(action);

    if (action.type === fetchWeatherRequest.type) {
      const state = store.getState();
      const currentCityName = state.cities.currentCity;

      if (!currentCityName) {
        store.dispatch(fetchWeatherFailure('No city entered'));
        return next(action);
      }

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(currentCityName)}&appid=${OPENWEATHER_API_KEY}&units=metric`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const tempValue = Math.round(data.main.temp);
        const temperature =
          tempValue > 0 ? `+${tempValue}°C` : `${tempValue}°C`;

        store.dispatch(
          fetchWeatherSuccess({
            coordinates: [data.coord.lon.toString(), data.coord.lat.toString()],
            temperature,
            icon: data.weather[0].icon,
          }),
        );
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'API request failed';
        store.dispatch(fetchWeatherFailure(message));
      }
    }

    return result;
  };
