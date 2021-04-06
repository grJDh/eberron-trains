import { createSlice } from '@reduxjs/toolkit';

// const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;
// const placeToLocalStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));

const capitalize = text => {
  // eslint-disable-next-line
  if (!text == 0) {
    const splitted = text.split(' ');
    const newText = splitted.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
    return newText.join(' ');
  } else {
    return '';
  }
}

const initialState = {
  rails4E: [
    ['Krona Peak', "Irontown", 104],
    ['Irontown', "Vulyar", 315],
    ['Korth', "Rekkenmark", 112],
    ['Korth', "Atur", 195],
    ['Atur', "Vedykar", 148],
    ['Vedykar', "Fort Zombie", 142],
    ['Sharn', "First Tower", 44],
    ['First Tower', "Wroat", 250],
    ['Wroat', "Hatheril", 478],
    ['Hatheril', "Starilaskur", 223],
    ['Hatheril', "Sword Keep", 106],
    ['Wroat', "Starilaskur", 617],
    ['Starilaskur', "Sterngate", 269],
    ['Starilaskur', "Vathirond", 198],
    ['Vathirond', "Aruldusk", 142],
    ['Aruldusk', "Sigilstar", 99],
    ['Sigilstar', "Flamekeep", 194],
    ['Sword Keep', "Marketplace", 96],
    ['Marketplace', "Passage", 255],
    ['Passage', "Fairhaven", 227],
    ['Fairhaven', "Thaliost", 361],
    ['Sterngate', "Zolanberg", 214],
    ['Zolanberg', "Korranberg", 195],
  ],
  rails3E: [
    ['Krona Peak', "Irontown", 142],
    ['Irontown', "Vulyar", 456],
    ['Korth', "Rekkenmark", 141],
    ['Korth', "Atur", 332],
    ['Atur', "Vedykar", 227],
    ['Vedykar', "Fort Zombie", 239],
    ['Sharn', "First Tower", 56],
    ['First Tower', "Wroat", 417],
    ['Wroat', "Hatheril", 717],
    ['Hatheril', "Starilaskur", 372],
    ['Hatheril', "Sword Keep", 150],
    ['Wroat', "Starilaskur", 939],
    ['Starilaskur', "Sterngate", 369],
    ['Starilaskur', "Vathirond", 287],
    ['Vathirond', "Aruldusk", 262],
    ['Aruldusk', "Sigilstar", 166],
    ['Sigilstar', "Flamekeep", 300],
    ['Sword Keep', "Marketplace", 97],
    ['Marketplace', "Passage", 369],
    ['Passage', "Fairhaven", 348],
    ['Fairhaven', "Thaliost", 617],
    ['Sterngate', "Zolanberg", 386],
    ['Zolanberg', "Korranberg", 300],
  ],
  // combinedRails: [],
  basePrices: {
    'ERLW (5E) - per mile': [{tier: 'Any', price: 0.5, pricingMethod:'per mile', mod: 1}],
    'WGtE (5E) - per day': [
      {tier: 'Flat', price: 1, pricingMethod:'per hour', mod: 24},
      {tier: 'Luxury', price: 4, pricingMethod:'per hour', mod: 24}
    ],
    'ECG (4E) - per mile': [
      {tier: 'First Class', price: 0.5, pricingMethod:'per mile', mod: 1},
      {tier: 'Standard', price: 0.2, pricingMethod:'per mile', mod: 1},
      {tier: 'Steerage', price: 0.03, pricingMethod:'per mile', mod: 1}
    ],
  },
  startStation: '',
  finishStation: '',
  miles: 0,
  path: [],
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    startStationChange: (state, { payload }) => {
      state.startStation = capitalize(payload);
    },
    finishStationChange: (state, { payload }) => {
      state.finishStation = capitalize(payload);
    },
    setMiles: (state, { payload }) => {
      state.miles = payload;
    },
    setPath: (state, { payload }) => {
      state.path = payload;
    },
    setCombinedRails: (state, { payload }) => {
      state.combinedRails = payload;
    },
  }
});

export const { startStationChange, finishStationChange, setMiles, setPath, setCombinedRails } = mainSlice.actions;

export const mainSelector = state => state.main;

export default mainSlice.reducer;