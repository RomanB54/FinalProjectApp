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
    dispatch(addCityName(city));
    navigate(`/weather/${encodeURIComponent(city)}`, { replace: false });
  };

  return (
    <div className="history-card">
      <div className="header-page">History</div>
      <ul className="history-city">
        {history.map((city, index) => (
          <li
            key={`${city}-${index}`}
            className="li-history"
            onClick={() => handleHistoryCityClick(city)}
            style={{ cursor: 'pointer' }}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};
