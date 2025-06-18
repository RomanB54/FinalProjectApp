import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputWithImage } from './InputWithImage';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { cityReducer, initialState, addCityName } from '../../store/city.slice';
import { StoreApp, AppDispatch } from '../../store';
import * as reactRouterDom from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('InputWithImage', () => {
  const store = configureStore({
    reducer: {
      cities: cityReducer,
      profile: (state = {}) => state,
    },
    preloadedState: {
      cities: {
        ...initialState,
        coordinates: ['37.62', '55.75'],
      },
      profile: {},
    },
  });

  const dispatchSpy = jest.spyOn(
    store,
    'dispatch',
  ) as jest.MockedFunction<AppDispatch>;

  const navigateMock = reactRouterDom.useNavigate as jest.Mock;

  beforeEach(() => {
    navigateMock.mockReset();
    navigateMock.mockReturnValue(jest.fn());
  });

  it('renders input, button and map image with src', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <InputWithImage />
        </MemoryRouter>
      </Provider>,
    );

    const input = screen.getByPlaceholderText(/enter city/i);
    const button = screen.getByRole('button', { name: /submit/i });
    const img = screen.getByAltText(/map/i);

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(img).toBeInTheDocument();

    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('ll=37.62,55.75'),
    );
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining(process.env.REACT_APP_YANDEX_MAPS_API_KEY || ''),
    );
  });

  it('updates input value on change', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <InputWithImage />
        </MemoryRouter>
      </Provider>,
    );

    const input = screen.getByPlaceholderText(/enter city/i);
    fireEvent.change(input, { target: { value: 'Moscow' } });
    expect(input).toHaveValue('Moscow');
  });

  it('dispatches addCityName and navigates on submit', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <InputWithImage />
        </MemoryRouter>
      </Provider>,
    );

    const input = screen.getByPlaceholderText(/enter city/i);
    const button = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'Moscow' } });
    fireEvent.click(button);

    expect(dispatchSpy).toHaveBeenCalledWith(addCityName('Moscow'));
    expect(navigateMock).toHaveBeenCalled();
  });
});
