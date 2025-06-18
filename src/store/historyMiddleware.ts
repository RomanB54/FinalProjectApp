import { Middleware } from '@reduxjs/toolkit';
import { AppActions, StoreApp } from '.';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { addCityName, setHistoryList } from './city.slice';
import { db } from './firebase';

export function isAppAction(action: unknown): action is AppActions {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (action as any).type === 'string'
  );
}

export const citiesMiddleware: Middleware<AppActions, StoreApp> =
  (store) => (next) => async (action: unknown) => {
    if (!isAppAction(action)) {
      return next(action);
    }
    const result = next(action);
    const state = store.getState();
    const userId = state.profile.id;
    if (
      action.type === 'profile/changeLogged' &&
      action.payload === true &&
      userId
    ) {
      try {
        const citiesRef = collection(db, 'users', userId, 'cities');
        const snapshot = await getDocs(citiesRef);
        const cities: string[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.name) cities.push(data.name);
        });
        const citiesLast8 = cities.slice(-8);
        store.dispatch(setHistoryList(citiesLast8));
      } catch (error) {
        console.error('Failed to load city history:', error);
      }
    }
    if (action.type === addCityName.type && userId) {
      const cityName = action.payload;
      try {
        const citiesRef = collection(db, 'users', userId, 'cities');
        const q = query(citiesRef, where('name', '==', cityName));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          await addDoc(citiesRef, {
            name: cityName,
            addedAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('Failed to save city:', error);
      }
    }

    return result;
  };
