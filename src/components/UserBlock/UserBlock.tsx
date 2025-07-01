import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreApp } from '../../store';
import { logout } from '../../store/profile.slice';
import { signOut } from 'firebase/auth';
import { auth } from '../../store/firebase';
import { useNavigate } from 'react-router';

export const UserBlock: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const login = useSelector((state: StoreApp) => state.profile.login);
  const logged = useSelector((state: StoreApp) => state.profile.logged);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!logged) {
    return null;
  }

  return (
    <div className="user-block">
      <span>
        Welcome, <strong>{login}</strong>!
      </span>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
