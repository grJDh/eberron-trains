import { createSlice } from '@reduxjs/toolkit';

const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;

const initialState = checkLocalStorage('settingsStore',
{
  costMode: '0',
  distanceSource: '4E',
  speed: 30,
  customRails: [
    ['Thaliost', "Rekkenmark", 27],
    ['Vedykar', "Vulyar", 147],
    ['Vulyar', "Gatherhold", 302]
  ],
});

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
    setCustomRails: (state, { payload }) => {
      state.customRails = payload;
    },
  }
});

export const { costModeChange, distanceSourceChange, speedChange, setCustomRails } = settingsSlice.actions;

export const settingsSelector = state => state.settings;

export default settingsSlice.reducer;