import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';

jest.mock('../UserBlock/UserBlock', () => ({
  UserBlock: () => <div data-testid="user-block" />,
}));

describe('Header', () => {
  it('renders header with size 1', () => {
    render(<Header text="Header 1" size={1} className="header-class" />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveClass('header-class');
    expect(h1).toHaveTextContent('Header 1');
  });

  it('renders header with size 2', () => {
    render(<Header text="Header 2" size={2} className="header-class" />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe('H2');
  });

  it('renders header with size 3', () => {
    render(<Header text="Header 3" size={3} className="header-class" />);
    const h3 = screen.getByRole('heading', { level: 3 });
    expect(h3).toBeInTheDocument();
    expect(h3.tagName).toBe('H3');
  });

  it('renders UserBlock', () => {
    render(<Header text="Header" size={1} className="header-class" />);
    const userBlock = screen.getByTestId('user-block');
    expect(userBlock).toBeInTheDocument();
  });
});
