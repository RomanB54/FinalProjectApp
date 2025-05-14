import { HistoryList } from './HistoryList';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('HistoryList', () => {
  const mockCities = ['Moscow', 'Novosibirsk'];
  const mockHandleClick = jest.fn();

  beforeEach(() => {
    mockHandleClick.mockClear();
  });
  it('should render cities ', async () => {
    render(
      <HistoryList
        cities={mockCities}
        handleHistoryCityClick={mockHandleClick}
      />,
    );
    expect(screen.getByText('Moscow')).toBeInTheDocument();
    expect(screen.getByText('Novosibirsk')).toBeInTheDocument();
  });

  it('should handleClick with right city ', async () => {
    render(
      <HistoryList
        cities={mockCities}
        handleHistoryCityClick={mockHandleClick}
      />,
    );
    const city = screen.getByText('Moscow');
    fireEvent.click(city);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    expect(mockHandleClick).toHaveBeenCalledWith('Moscow');
  });
});
