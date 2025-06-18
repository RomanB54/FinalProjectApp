import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, db } from '../../store/firebase';
import {
  changeEmail,
  changeLogged,
  changeLogin,
  setUid,
} from '../../store/profile.slice';
import { doc, getDoc } from 'firebase/firestore';

export const AuthStateListener: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUid(user.uid));
        dispatch(changeLogged(true));
        dispatch(changeEmail(user.email || ''));
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userProfile = userDoc.data();
          dispatch(changeLogin(userProfile.username || ''));
        } else {
          dispatch(changeLogin(''));
        }
      } else {
        dispatch(setUid(''));
        dispatch(changeLogged(false));
        dispatch(changeEmail(''));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};
