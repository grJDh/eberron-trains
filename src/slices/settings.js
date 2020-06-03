import { createSlice } from '@reduxjs/toolkit';

const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;
const placeToLocalStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));

const initialState = {
  costMode: '0',
  distanceSource: '4E',
}

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
  }
});

export const { costModeChange, distanceSourceChange } = settingsSlice.actions;

export const settingsSelector = state => state.settings;

export default settingsSlice.reducer;