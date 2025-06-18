import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { profileReducer, profileSlice } from './profile.slice';
import { citiesSlice, cityReducer } from './city.slice';
import { citiesMiddleware } from './historyMiddleware';
import { authMiddleware } from './authMiddleware';
import { weatherMiddleware } from './weatherThunk';

export type AppActions =
  | ReturnType<(typeof citiesSlice.actions)[keyof typeof citiesSlice.actions]>
  | ReturnType<
      (typeof profileSlice.actions)[keyof typeof profileSlice.actions]
    >;

const rootReducer = combineReducers({
  cities: cityReducer,
  profile: profileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      citiesMiddleware,
      authMiddleware,
      weatherMiddleware,
    ),

  devTools: {
    name: 'My weather APP',
    trace: true,
  },
});

export type StoreApp = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
