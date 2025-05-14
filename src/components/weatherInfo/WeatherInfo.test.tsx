import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WeatherInfo } from './WeatherInfo';

describe('WeatherInfo', () => {
  const city = 'Novosibirsk';
  const temperature = '15';
  const icon = '4d';

  it('renders city and temperature', () => {
    render(<WeatherInfo city={city} temperature={temperature} icon={icon} />);
    expect(screen.getByText('Weather info')).toBeInTheDocument();
    expect(screen.getByText(city)).toBeInTheDocument();
    expect(screen.getByText(temperature)).toBeInTheDocument();
  });

  it('renders weather icon with src', () => {
    render(<WeatherInfo city={city} temperature={temperature} icon={icon} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src');
  });
});
