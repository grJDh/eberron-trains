import { createSlice } from '@reduxjs/toolkit';

// const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;
// const placeToLocalStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));

export const initialState = {
  rails: {
    'Rekkenmark': {
      'Korth': 112
    },
    'Korth': {
      'Rekkenmark': 112,
      'Atur': 195
    },
    'Atur': {
      'Korth': 195,
      'Vedykar': 148
    },
    'Vedykar': {
      'Atur': 148,
      'Fort Zombie': 142
    },
    'Fort Zombie': {
      'Vedykar': 142
    }
  },
  startStation: 'Korth',
  finishStation: 'Fort Zombie',
  miles: 0,
  path: [],
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    startStationChange: (state, { payload }) => {
      state.startStation = payload;
    },
    finishStationChange: (state, { payload }) => {
      state.finishStation = payload;
    },
    setMiles: (state, { payload }) => {
      state.miles = payload;
    },
    setPath: (state, { payload }) => {
      state.path = payload;
    },
  }
});

export const { startStationChange, finishStationChange, setMiles, setPath } = mainSlice.actions;

export const mainSelector = state => state.main;

export default mainSlice.reducer;