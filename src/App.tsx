import React, { Suspense, lazy } from 'react';

import { Link, Route, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { StoreApp } from './store';

const SignIn = lazy(() => import('./components/signin/Signin'));
const Layout = lazy(() => import('./components/layout/Layout'));
const About = lazy(() => import('./components/About/About'));

export default function App() {
  const logged = useSelector((state: StoreApp) => state.profile.logged);
  return (
    <div className="weather-app">
      <div className="link-container">
        <br></br>
        <ul>
          {!logged && (
            <li>
              <Link to="/">Authorization</Link>
            </li>
          )}
          {logged && (
            <li>
              <Link to="/weather">Weather</Link>
            </li>
          )}
          <li>
            <Link to="/about">About project</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/weather/:city?" element={<Layout />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}
