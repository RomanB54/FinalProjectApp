import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthStateListener } from './components/AuthStateListener/AuthStateListener';
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthStateListener />
      <App />
    </BrowserRouter>
  </Provider>,
);
