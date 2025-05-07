import React from 'react';
import { Layout } from './components/layout/Layout';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';

describe('App component', () => {
  const mockHandleCity = jest.fn();
  const mockOnChange = jest.fn();
  const mockHandleHistoryCityClick = jest.fn();
  const props = {
    handleCity: mockHandleCity,
    onChange: mockOnChange,
    handleHistoryCityClick: mockHandleHistoryCityClick,
    city: 'Novosibirsk',
    temperature: '20',
    icon: '04d',
    value: 'Moscow',
    urlImg: 'https://test.com/test.png',
    cities: ['Abakan', 'Minsk', 'Tomsk'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all elements', () => {
    render(<Layout {...props} />);
    expect(screen.getByText('Weather Information APP')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(props.value);
    expect(screen.getAllByRole('img').length).toBe(2);
    expect(screen.getByText(props.city)).toBeInTheDocument();
    expect(screen.getByText(props.temperature)).toBeInTheDocument();
    props.cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });
  it('should call OnChange when typing something to input', () => {
    render(<Layout {...props} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Ekaterinburg' },
    });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
  it('should call HandleCity when click submit button', () => {
    render(<Layout {...props} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandleCity).toHaveBeenCalledTimes(1);
  });

  it('should call handleHistoryCityClick when click on a history city item', () => {
    render(<Layout {...props} />);
    props.cities.forEach((city) => {
      fireEvent.click(screen.getByText(city));
      expect(mockHandleHistoryCityClick).toHaveBeenCalledWith(city);
    });
  });
});
