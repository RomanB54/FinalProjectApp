import { useState, useEffect } from 'react';
import React from 'react';
import { Layout } from './components/layout/Layout';

type CityWithCoordinates = {
  city: string;
  coordinates?: number[] | undefined;
  temperature?: string | undefined;
  icon?: string | '';
  urlImg?: string;
};

type Cities = string[];

export default function App() {
  const [cityName, setCity] = useState<CityWithCoordinates | undefined>(
    undefined,
  );
  const [value, setValue] = useState('');
  const [cities, setCities] = useState<Cities>([]);

  const getLocalStorageCities = (): Cities => {
    const tempData = localStorage.getItem('historyCities');
    return tempData ? JSON.parse(tempData) : [];
  };

  const addCityToList = (city: string): Cities => {
    const tempArr = getLocalStorageCities();
    const existingIndex = tempArr.indexOf(city);
    if (existingIndex !== -1) {
      tempArr.splice(existingIndex, 1);
    }
    tempArr.unshift(city);
    if (tempArr.length > 10) {
      tempArr.pop();
    }
    localStorage.setItem('historyCities', JSON.stringify(tempArr));
    return tempArr;
  };

  const getCityByLocation = async (): Promise<
    CityWithCoordinates | undefined
  > => {
    try {
      const response = await fetch(
        'https://ipinfo.io/json?token=7ce0407bb7be70',
      );
      const jsonResponse = await response.json();
      const cityByIP = jsonResponse.city;
      const finalCityInfo = await getWeatherAndCoordinates(cityByIP);

      if (finalCityInfo && finalCityInfo.coordinates) {
        const urlImage = updateMapLink(finalCityInfo.coordinates);
        return {
          city: finalCityInfo.city,
          coordinates: finalCityInfo.coordinates,
          temperature: finalCityInfo.temperature,
          icon: finalCityInfo.icon,
          urlImg: urlImage,
        };
      }
      return undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const updateMapLink = (coordinates: number[]) => {
    return `https://static-maps.yandex.ru/v1?lang=ru_RU&ll=${coordinates.toString()}&spn=0.3,0.3&size=400,400&apikey=e091f93b-1d71-4a7d-ae59-8369de3754d8`;
  };

  const getWeatherAndCoordinates = async (
    city: string,
  ): Promise<CityWithCoordinates | undefined> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=50e9562e52bdc95310309ebf4c74c77c&units=metric&lang=en`,
      );
      const data = await response.json();

      if (data?.cod === 200) {
        return {
          city: data.name,
          temperature:
            data.main.temp >= 0
              ? data.main.temp === 0
                ? Math.round(data.main.temp).toString() + '°C'
                : '+' + Math.round(data.main.temp).toString() + '°C'
              : '-' + Math.round(data.main.temp).toString() + '°C',
          coordinates: [data.coord.lon, data.coord.lat],
          icon: data.weather[0]?.icon,
        };
      }
      return undefined;
    } catch (e) {
      console.log('Failed to get weather information', e);
      return undefined;
    }
  };

  useEffect(() => {
    (async () => {
      const cityData = await getCityByLocation();
      if (cityData) setCity(cityData);

      const storedCities = getLocalStorageCities();
      setCities(storedCities);
    })();
  }, []);

  if (!cityName) return <div>Loading...</div>;

  const handleCity = async () => {
    if (!value.trim()) return;
    const newCityName = value.trim();
    const newCityWeather = await getWeatherAndCoordinates(newCityName);
    if (newCityWeather && newCityWeather.coordinates) {
      newCityWeather.urlImg = updateMapLink(newCityWeather.coordinates);
    }
    const updatedCities = await addCityToList(newCityName);
    setCities(updatedCities);
    setCity(newCityWeather);
    setValue('');
  };

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  const handleHistoryCityClick = async (city: string) => {
    const newCityWeather = await getWeatherAndCoordinates(city);
    if (newCityWeather?.coordinates) {
      newCityWeather.urlImg = updateMapLink(newCityWeather.coordinates);
    }
    await addCityToList(city);
    setCity(newCityWeather);
  };

  return (
    <div className="weather-app">
      <Layout
        handleCity={handleCity}
        onChange={handleInput}
        city={cityName.city}
        temperature={cityName.temperature ?? '-'}
        value={value}
        icon={cityName.icon ?? '04d'}
        urlImg={cityName.urlImg ?? '-'}
        cities={cities}
        handleHistoryCityClick={handleHistoryCityClick}
      />
    </div>
  );
}
