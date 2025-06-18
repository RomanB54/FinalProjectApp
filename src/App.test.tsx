import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('./components/layout/Layout', () => () => (
  <div>Layout Component</div>
));
jest.mock('./components/signin/Signin', () => () => (
  <div>SignIn Component</div>
));
jest.mock('./components/About/About', () => () => <div>About Component</div>);

const mockStore = (logged = false) =>
  configureStore({
    reducer: {
      profile: () => ({ logged }),
    },
  });

describe('App component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows auth link when not logged in', () => {
    render(
      <Provider store={mockStore(false)}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Authorization')).toBeInTheDocument();
    expect(screen.queryByText('Weather')).not.toBeInTheDocument();
  });

  it('shows weather link when logged in', () => {
    render(
      <Provider store={mockStore(true)}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.queryByText('Authorization')).not.toBeInTheDocument();
  });

  it('always shows about link', () => {
    render(
      <Provider store={mockStore(false)}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('About project')).toBeInTheDocument();
  });

  it('renders SignIn component for root route', async () => {
    render(
      <Provider store={mockStore(false)}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('SignIn Component')).toBeInTheDocument();
  });

  it('renders Layout component for weather route', async () => {
    render(
      <Provider store={mockStore(true)}>
        <MemoryRouter initialEntries={['/weather']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Layout Component')).toBeInTheDocument();
  });

  it('renders About component for about route', async () => {
    render(
      <Provider store={mockStore(false)}>
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('About Component')).toBeInTheDocument();
  });

  it('shows 404 page for unknown', async () => {
    render(
      <Provider store={mockStore(false)}>
        <MemoryRouter initialEntries={['/unknown']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('404')).toBeInTheDocument();
  });
});
