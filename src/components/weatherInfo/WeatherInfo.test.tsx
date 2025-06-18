import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeatherInfo } from './WeatherInfo';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

const useSelectorMock = useSelector as unknown as jest.Mock;

describe('WeatherInfo component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    useSelectorMock.mockReturnValue({
      currentCity: '',
      temperature: '',
      icon: '',
      isLoading: true,
      error: null,
    });

    render(<WeatherInfo />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    useSelectorMock.mockReturnValue({
      currentCity: '',
      temperature: '',
      icon: '',
      isLoading: false,
      error: 'Failed to fetch weather',
    });

    render(<WeatherInfo />);

    expect(
      screen.getByText(/error: failed to fetch weather/i),
    ).toBeInTheDocument();
  });

  it('renders prompt when no city is entered', () => {
    useSelectorMock.mockReturnValue({
      currentCity: '',
      temperature: '',
      icon: '',
      isLoading: false,
      error: null,
    });

    render(<WeatherInfo />);

    expect(
      screen.getByText(/enter a city to see the weather/i),
    ).toBeInTheDocument();
  });

  it('renders weather info when data is available', () => {
    const mockState = {
      currentCity: 'Moscow',
      temperature: '20°C',
      icon: '4d',
      isLoading: false,
      error: null,
    };

    useSelectorMock.mockReturnValue(mockState);

    render(<WeatherInfo />);

    expect(screen.getByText(/weather information/i)).toBeInTheDocument();
    expect(screen.getByText(mockState.temperature)).toBeInTheDocument();
    expect(screen.getByText(mockState.currentCity)).toBeInTheDocument();

    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toHaveAttribute(
      'src',
      `https://openweathermap.org/img/wn/${mockState.icon}@2x.png`,
    );
  });
});
