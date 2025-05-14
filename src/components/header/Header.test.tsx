import { Header } from './Header';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Header', () => {
  it('should render header h1 ', async () => {
    render(<Header text="header1" size={1} className="header2" />);
    const headerElement = await screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();
  });
});
