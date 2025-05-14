import React from 'react';
import { FC } from 'react';
import { Header } from '../header/Header';
import { InputWithImage } from '../inputWithImage/InputWithImage';
import { WeatherInfo } from '../weatherInfo/WeatherInfo';
import { HistoryList } from '../historyList/HistoryList';

type Props = {
  handleCity: () => void;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleHistoryCityClick: (city: string) => void;
  city: string;
  temperature: string;
  icon: string;
  value: string;
  urlImg: string;
  cities: string[];
};

export const Layout: FC<Props> = ({
  handleCity,
  onChange,
  city,
  temperature,
  icon,
  value,
  urlImg,
  cities,
  handleHistoryCityClick,
}) => {
  return (
    <>
      <Header
        text={'Weather Information APP'}
        size={1}
        className={'header-page'}
      />
      <div className="layer1">
        <InputWithImage
          handleCity={handleCity}
          onChange={onChange}
          value={value}
          urlImg={urlImg}
        />
        <WeatherInfo city={city} temperature={temperature} icon={icon} />
        <HistoryList
          cities={cities}
          handleHistoryCityClick={handleHistoryCityClick}
        />
      </div>
    </>
  );
};
