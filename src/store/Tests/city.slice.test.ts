import {
  citiesSlice,
  addCityName,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  fetchWeatherRequest,
  fetchMapRequest,
  fetchMapSuccess,
  getHistoryListSuccess,
} from '../city.slice';
import { City } from '../city.slice';

describe('citiesSlice', () => {
  it('should handle addCityName', () => {
    let state = citiesSlice.getInitialState();
    state = citiesSlice.reducer(state, addCityName('FirstCity'));
    expect(state.currentCity).toBe('FirstCity');
    expect(state.historyList).toEqual(['FirstCity']);

    state = citiesSlice.reducer(state, addCityName('SecondCity'));
    expect(state.currentCity).toBe('SecondCity');
    expect(state.historyList).toEqual(['SecondCity', 'FirstCity']);

    state = citiesSlice.reducer(state, addCityName('FirstCity'));
    expect(state.historyList).toEqual(['FirstCity', 'SecondCity']);
  });

  it('should limit historyList to 8 items', () => {
    let state = citiesSlice.getInitialState();
    for (let i = 1; i <= 8; i++) {
      state = citiesSlice.reducer(state, addCityName(`City${i}`));
    }
    expect(state.historyList.length).toBe(8);
    expect(state.historyList[0]).toBe('City8');
    expect(state.historyList[7]).toBe('City1');
  });

  it('should handle fetchWeatherSuccess', () => {
    let state = citiesSlice.getInitialState();
    state = citiesSlice.reducer(
      state,
      fetchWeatherSuccess({
        coordinates: ['51.5074', '-0.1278'],
        temperature: '15',
        icon: '04d',
      }),
    );
    expect(state.coordinates).toEqual(['51.5074', '-0.1278']);
    expect(state.temperature).toBe('15');
    expect(state.icon).toBe('04d');
    expect(state.isLoading).toBe(false);
  });

  it('should handle fetchWeatherFailure', () => {
    let state = citiesSlice.getInitialState();
    state = citiesSlice.reducer(state, fetchWeatherRequest());
    expect(state.isLoading).toBe(true);
    state = citiesSlice.reducer(state, fetchWeatherFailure('Failed to fetch'));
    expect(state.error).toBe('Failed to fetch');
    expect(state.isLoading).toBe(false);
  });

  it('should handle fetchMapSuccess', () => {
    let state = citiesSlice.getInitialState();
    state = citiesSlice.reducer(state, fetchMapRequest());
    expect(state.isMapLoading).toBe(true);
    state = citiesSlice.reducer(state, fetchMapSuccess('map-url'));
    expect(state.map).toBe('map-url');
    expect(state.isMapLoading).toBe(false);
  });

  it('should handle getHistoryListSuccess', () => {
    let state = citiesSlice.getInitialState();
    state = citiesSlice.reducer(
      state,
      getHistoryListSuccess({
        historyList: ['Moscow', 'Novosibirsk'],
      } as unknown as string[]),
    );
    expect(state.historyList).toEqual({
      historyList: ['Moscow', 'Novosibirsk'],
    });
  });
});
