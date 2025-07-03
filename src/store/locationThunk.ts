import { AppDispatch } from '.';
import { addCityName, setCurrentCity } from './city.slice';
import { IPINFO_TOKEN } from '../config';

interface IpInfoResponse {
  city?: string;
}

export const getCityByLocation = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(
      `https://ipinfo.io/json?token=${IPINFO_TOKEN}`,
    );

    if (!response.ok) {
      console.error(`HTTP error: ${response.status}`);
      return;
    }

    const data: IpInfoResponse = await response.json();

    if (!data.city) {
      console.error('City not found in response');
      return;
    }

    dispatch(addCityName(data.city));
    dispatch(setCurrentCity(data.city));
  } catch (error) {
    console.error('Failed to fetch city', error);
  }
};
