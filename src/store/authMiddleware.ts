import { Middleware } from '@reduxjs/toolkit';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from './firebase';
import { changeEmail, changeLogged, setUid } from './profile.slice';

interface AuthAction {
  type: 'auth/signIn' | 'auth/register';
  payload: {
    email: string;
    password: string;
  };
}

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    (action.type === 'auth/signIn' || action.type === 'auth/register')
  ) {
    const authAction = action as AuthAction;
    if (action.type === 'auth/signIn') {
      const { email, password } = authAction.payload;
      signInWithEmailAndPassword(auth, email, password)
        .then((userData) => {
          const user = userData.user;
          store.dispatch(changeEmail(user.email || ''));
          store.dispatch(changeLogged(true));
          store.dispatch(setUid(user.uid));
        })
        .catch((error) => {
          console.error('Sign in error:', error);
        });
    } else if (action.type === 'auth/register') {
      const { email, password } = authAction.payload;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userData) => {
          const user = userData.user;
          store.dispatch(changeEmail(user.email || ''));
          store.dispatch(changeLogged(true));
          store.dispatch(setUid(user.uid));
        })
        .catch((error) => {
          console.error('Registration error:', error);
        });
    }
  }
  return next(action);
};
