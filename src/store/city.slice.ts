import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type City = {
  isMapLoading: boolean;
  isLoading: boolean;
  historyList: string[];
  id: number;
  currentCity: string;
  coordinates: string[];
  temperature: string;
  icon: string;
  map: string;
  error: null | string;
  mapError: null | string;
  historyError: null | string;
};

export const initialState: City = {
  isMapLoading: false,
  isLoading: false,
  historyList: [],
  id: 0,
  currentCity: '',
  coordinates: ['', ''],
  temperature: '0',
  icon: '4d',
  map: '404',
  error: null,
  mapError: null,
  historyError: null,
};
export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    fetchWeatherRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (
      state,
      action: PayloadAction<{
        coordinates: string[];
        temperature: string;
        icon: string;
      }>,
    ) => {
      state.coordinates = action.payload.coordinates;
      state.temperature = action.payload.temperature;
      state.icon = action.payload.icon;
      state.isLoading = false;
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    fetchMapRequest: (state) => {
      state.isMapLoading = true;
      state.mapError = null;
    },
    fetchMapSuccess: (state, action: PayloadAction<string>) => {
      state.map = action.payload;
      state.isMapLoading = false;
    },
    fetchMapFailure: (state, action: PayloadAction<string>) => {
      state.mapError = action.payload;
      state.isMapLoading = false;
    },

    getHistoryListRequest: (state) => {
      state.historyError = null;
    },
    getHistoryListSuccess: (state, action: PayloadAction<string[]>) => {
      state.historyList = action.payload;
    },
    getHistoryListFailure: (state, action: PayloadAction<string>) => {
      state.historyError = action.payload;
    },

    addCityName: (state, action: PayloadAction<string>) => {
      const cityName = action.payload;
      state.historyList = state.historyList.filter((c) => c !== cityName);
      state.historyList.unshift(cityName);

      if (state.historyList.length > 10) {
        state.historyList.pop();
      }
    },
    setHistoryList: (state, action: PayloadAction<string[]>) => {
      state.historyList = action.payload;
    },
    setCurrentCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
  },
});

export const cityReducer = citiesSlice.reducer;

export const {
  addCityName,
  setCurrentCity,
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  fetchMapRequest,
  fetchMapSuccess,
  fetchMapFailure,
  getHistoryListRequest,
  getHistoryListSuccess,
  getHistoryListFailure,
  setHistoryList,
} = citiesSlice.actions;
