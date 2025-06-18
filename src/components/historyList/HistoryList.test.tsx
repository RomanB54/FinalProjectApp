import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { HistoryList } from './HistoryList';
import {
  cityReducer,
  initialState as cityInitialState,
} from '../../store/city.slice';

const LocationDisplay: React.FC = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

describe('HistoryList', () => {
  it('navigates on city click', () => {
    const preloadedState = {
      ...cityInitialState,
      historyList: ['Moscow', 'Omsk', 'Novosibirsk'],
    };

    const store = configureStore({
      reducer: {
        cities: cityReducer,
      },
      preloadedState: {
        cities: preloadedState,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <HistoryList />
          <LocationDisplay />
        </MemoryRouter>
      </Provider>,
    );

    const cityItem = screen.getByText('Moscow');
    fireEvent.click(cityItem);

    expect(screen.getByTestId('location-display')).toHaveTextContent(
      '/weather/Moscow',
    );
  });
});
