import { createSlice } from '@reduxjs/toolkit';

const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;

const initialState = checkLocalStorage('settingsStore',
{
  costMode: '0',
  distanceSource: '4E',
  speed: 30,
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
  }
});

export const { costModeChange, distanceSourceChange, speedChange } = settingsSlice.actions;

export const settingsSelector = state => state.settings;

export default settingsSlice.reducer;