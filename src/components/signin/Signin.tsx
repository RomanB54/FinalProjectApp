import React, { FC, useState } from 'react';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import {
  changeEmail,
  changeLogged,
  changeLogin,
} from '../../store/profile.slice';
import { useNavigate } from 'react-router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../../store/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

export const SignIn: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [useEmailAuth, setUseEmailAuth] = useState(true);
  const [isSignIn, setIsSignIn] = useState(true);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setError('');
    if (!isSignIn && password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!isSignIn && !login.trim()) {
      setError('User name is required for registration!');
      return;
    }
    try {
      if (useEmailAuth) {
        const userData = isSignIn
          ? await signInWithEmailAndPassword(auth, email, password)
          : await createUserWithEmailAndPassword(auth, email, password);
        if (!isSignIn) {
          await setDoc(doc(db, 'users', userData.user.uid), {
            username: login.trim(),
            email: userData.user.email,
          });
        }
        let username = login;
        if (isSignIn) {
          const userDoc = await getDoc(doc(db, 'users', userData.user.uid));
          if (userDoc.exists()) {
            const userProfile = userDoc.data();
            username = userProfile.username || '';
          }
        }
        dispatch(changeLogin(username));
        dispatch(changeEmail(userData.user.email || ''));
        dispatch(changeLogged(true));
        navigate('/Weather');
      } else {
        const q = query(
          collection(db, 'users'),
          where('username', '==', login),
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          throw new Error('Username not found');
        }
        const userDoc = querySnapshot.docs[0];
        const userEmail = userDoc.data().email;
        await signInWithEmailAndPassword(auth, userEmail, password);
        dispatch(changeLogin(login));
        dispatch(changeEmail(userEmail));
        dispatch(changeLogged(true));
        navigate('/Weather');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isSignIn ? 'Sign In' : 'Create Account'}</h2>
      <label>
        <input
          type="radio"
          checked={useEmailAuth}
          onChange={() => setUseEmailAuth(true)}
        />
        Use email
      </label>
      <label>
        <input
          type="radio"
          checked={!useEmailAuth}
          onChange={() => setUseEmailAuth(false)}
        />
        Use user name
      </label>
      {useEmailAuth && (
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </label>
        </div>
      )}
      {!useEmailAuth && (
        <div>
          <label>
            User name:
            <input
              type="userName"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </label>
        </div>
      )}
      {!isSignIn && (
        <div>
          <label>
            Username (required):
            <input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </label>
        </div>
      )}
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
      </div>
      {!isSignIn && (
        <div>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </label>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <br />
      <button className="sign-in" type="submit">
        {isSignIn ? 'Sign In' : 'Register'}
      </button>
      <div>
        <button type="button" onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? 'Create an account' : 'Already have an account? Sign in'}
        </button>
      </div>
    </form>
  );
};

export default SignIn;
