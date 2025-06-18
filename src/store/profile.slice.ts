import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  login: string;
  email: string;
  password: string;
  logged: boolean;
  id: string;
}

const initialState: ProfileState = {
  login: '',
  email: '',
  password: '',
  logged: false,
  id: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changeLogged: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    },
    changeLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUid: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    logout: (state) => {
      state.login = '';
      state.email = '';
      state.logged = false;
    },
  },
});

export const profileReducer = profileSlice.reducer;

export const { changeLogged, changeLogin, changeEmail, setUid, logout } =
  profileSlice.actions;
