import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputWithImage } from './InputWithImage';
import { url } from 'inspector';

describe('InputWithImage component', () => {
  const mockOnChange = jest.fn();
  const mockHandleCity = jest.fn();
  const urlImg = 'https://test.com/test.png';

  beforeEach(() => {
    mockOnChange.mockClear();
    mockHandleCity.mockClear();
  });

  it('should render elements', () => {
    render(
      <InputWithImage
        value=""
        urlImg={urlImg}
        handleCity={mockHandleCity}
        onChange={mockOnChange}
      />,
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', urlImg);
  });

  it('should call onChange when typing in input', () => {
    render(
      <InputWithImage
        value=""
        urlImg={urlImg}
        handleCity={mockHandleCity}
        onChange={mockOnChange}
      />,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Novosibirsk' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should call handleCity when click submit button', () => {
    render(
      <InputWithImage
        value="Novosibirsk"
        urlImg={urlImg}
        handleCity={mockHandleCity}
        onChange={mockOnChange}
      />,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandleCity).toHaveBeenCalledTimes(1);
  });
});
