import { createSlice } from '@reduxjs/toolkit';

const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;

const baseState = {
  costMode: 'All',
  distanceSource: '4E',
  speed: 30,
  layover: 1,
  colorPrices: false,
  customRails: [
    ['Thaliost', "Rekkenmark", 27],
    ['Vedykar', "Vulyar", 147],
    ['Vulyar', "Gatherhold", 302]
  ],
  customPrices: {
    'Custom - per mile': [
      {tier: 'Flat', price: 0.01, pricingMethod:'per mile', mod: 1},
    ],
    'Custom - per hour': [
      {tier: 'Standard', price: 1, pricingMethod:'per hour', mod: 24},
    ]
  },
};

const localState = checkLocalStorage('settingsStore', baseState);
// const localState = baseState;

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
    setCustomPrices: (state, { payload }) => {
      state.customPrices = payload;
    },
    ColorPricesChange: (state, { payload }) => {
      console.log(payload)
      state.colorPrices = payload;
    },
  }
});

export const { costModeChange, distanceSourceChange, speedChange, setCustomRails, layoverChange, setCustomPrices, ColorPricesChange } = settingsSlice.actions;

export const settingsSelector = state => state.settings;

export default settingsSlice.reducer;