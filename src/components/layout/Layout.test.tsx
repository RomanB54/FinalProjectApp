import React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import * as reactRedux from 'react-redux';
import * as router from 'react-router-dom';
import { getCityByLocation } from '../../store/locationThunk';
import { fetchWeatherRequest } from '../../store/city.slice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../../store/locationThunk', () => ({
  getCityByLocation: jest.fn(() => ({ type: 'getCityByLocation' })),
}));
jest.mock('../../store/city.slice', () => ({
  fetchWeatherRequest: jest.fn(() => ({ type: 'fetchWeatherRequest' })),
}));

jest.mock('../header/Header', () => ({
  Header: ({ text }: { text: string }) => (
    <div data-testid="header">{text}</div>
  ),
}));
jest.mock('../inputWithImage/InputWithImage', () => ({
  InputWithImage: () => <div data-testid="input-with-image" />,
}));
jest.mock('../weatherInfo/WeatherInfo', () => ({
  WeatherInfo: () => <div data-testid="weather-info" />,
}));
jest.mock('../historyList/HistoryList', () => ({
  HistoryList: () => <div data-testid="history-list" />,
}));

describe('Layout component', () => {
  const useSelectorMock = reactRedux.useSelector as unknown as jest.Mock;
  const useDispatchMock = reactRedux.useDispatch as unknown as jest.Mock;
  const useParamsMock = router.useParams as jest.Mock;
  const useNavigateMock = router.useNavigate as jest.Mock;

  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatchMock.mockReturnValue(mockDispatch);
    useNavigateMock.mockReturnValue(mockNavigate);
  });

  it('renders child components', () => {
    useSelectorMock.mockReturnValue(''); // currentCity = ''
    useParamsMock.mockReturnValue({ city: undefined });

    render(<Layout />);

    expect(screen.getByTestId('header')).toHaveTextContent(
      'Weather Information APP',
    );
    expect(screen.getByTestId('input-with-image')).toBeInTheDocument();
    expect(screen.getByTestId('weather-info')).toBeInTheDocument();
    expect(screen.getByTestId('history-list')).toBeInTheDocument();
  });

  it('dispatches getCityByLocation if no city param and no currentCity', () => {
    useSelectorMock.mockReturnValue(''); // currentCity = ''
    useParamsMock.mockReturnValue({ city: undefined });

    render(<Layout />);

    expect(mockDispatch).toHaveBeenCalledWith(getCityByLocation());
  });

  it('does not dispatch getCityByLocation if city param or currentCity exists', () => {
    useSelectorMock.mockReturnValue('Moscow'); // currentCity exists
    useParamsMock.mockReturnValue({ city: 'Moscow' });

    render(<Layout />);

    expect(mockDispatch).not.toHaveBeenCalledWith(getCityByLocation());
  });

  it('navigates when currentCity changes and differs from city param', () => {
    useSelectorMock.mockReturnValue('NewYork');
    useParamsMock.mockReturnValue({ city: 'Moscow' });

    render(<Layout />);

    expect(mockNavigate).toHaveBeenCalledWith('/weather/NewYork', {
      replace: true,
    });
  });

  it('does not navigate if currentCity equals city param', () => {
    useSelectorMock.mockReturnValue('Moscow');
    useParamsMock.mockReturnValue({ city: 'Moscow' });

    render(<Layout />);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('dispatches fetchWeatherRequest when currentCity is set', () => {
    useSelectorMock.mockReturnValue('Moscow');
    useParamsMock.mockReturnValue({ city: 'Moscow' });

    render(<Layout />);

    expect(mockDispatch).toHaveBeenCalledWith(fetchWeatherRequest());
  });

  it('does not dispatch fetchWeatherRequest if currentCity is empty', () => {
    useSelectorMock.mockReturnValue('');
    useParamsMock.mockReturnValue({ city: undefined });

    render(<Layout />);

    expect(mockDispatch).not.toHaveBeenCalledWith(fetchWeatherRequest());
  });
});
