import { createSlice } from '@reduxjs/toolkit';

const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;

const baseState = {
  costMode: '0',
  distanceSource: '4E',
  speed: 30,
  layover: 1,
  customRails: [
    ['Thaliost', "Rekkenmark", 27],
    ['Vedykar', "Vulyar", 147],
    ['Vulyar', "Gatherhold", 302]
  ],
};

const localState = checkLocalStorage('settingsStore', baseState);

const initialState = {...baseState, ...localState};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    costModeChange: (state, { payload }) => {
      state.costMode = payload;
    },
    distanceSourceChange: (state, { payload }) => {
      state.distanceSource = payload;
    },
    speedChange: (state, { payload }) => {
      state.speed = payload;
    },
    layoverChange: (state, { payload }) => {
      state.layover = payload;
    },
    setCustomRails: (state, { payload }) => {
      state.customRails = payload;
    },
  }
});

export const { costModeChange, distanceSourceChange, speedChange, setCustomRails, layoverChange } = settingsSlice.actions;

export const settingsSelector = state => state.settings;

export default settingsSlice.reducer;