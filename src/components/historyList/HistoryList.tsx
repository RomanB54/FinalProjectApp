import React from 'react';
import { FC } from 'react';

type Props = {
  cities: string[];
  handleHistoryCityClick: (city: string) => void;
};

export const HistoryList: FC<Props> = ({ cities, handleHistoryCityClick }) => {
  const citiesList = cities.map((city) => (
    <li
      key={city}
      className="li-history"
      onClick={() => handleHistoryCityClick(city)}
      style={{ cursor: 'pointer' }}
    >
      {city}
    </li>
  ));

  return (
    <div className="layer4">
      <p className="show-weather">History</p>
      <ul className="history-city">{citiesList}</ul>
    </div>
  );
};
