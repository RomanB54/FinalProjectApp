import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreApp } from '../../store';
import { addCityName } from '../../store/city.slice';
import { useNavigate } from 'react-router-dom';

export const HistoryList: React.FC = () => {
  const history = useSelector((state: StoreApp) => state.cities.historyList);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleHistoryCityClick = (city: string) => {
    console.log('HistoryList: clicked city:', city);
    dispatch(addCityName(city));
     const currentPath = window.location.pathname;
     const basePath = '/FinalProjectApp';
    const targetPath = `${basePath}/weather/${encodeURIComponent(city)}`;
     if (location.pathname !== targetPath) {
      console.log(`Navigating from ${currentPath} to ${targetPath}`);
      navigate(targetPath, { replace: false });
    } else {
      console.log('Already at target URL, no navigation needed.');
    }
    //navigate(`/weather/${encodeURIComponent(city)}`, { replace: false });
  };

  const citiesList = history.map((city, index) => (
    <li
      key={`${city}-${index}`}
      className="li-history"
      onClick={() => handleHistoryCityClick(city)}
      style={{ cursor: 'pointer' }}
    >
      {city}
    </li>
  ));

  return (
    <div className="history-card">
      <div className="header-page">History</div>
      <ul className="history-city">{citiesList}</ul>
    </div>
  );
};
