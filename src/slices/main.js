import { createSlice } from '@reduxjs/toolkit';

// const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;
// const placeToLocalStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));

const capitalize = text => {
  if (!text == 0) {
    const splitted = text.split(' ');
    const newText = splitted.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
    return newText.join(' ');
  } else {
    return '';
  }
}

const initialState = {
  rails: {
    "Rekkenmark": {
      "Korth": 112,
      "Thaliost": 27
    },
    "Korth": {
      "Rekkenmark": 112,
      "Atur": 195
    },
    "Atur": {
      "Korth": 195,
      "Vedykar": 148
    },
    "Vedykar": {
      "Atur": 148,
      "Fort Zombie": 142,
      "Vulyar": 104
    },
    "Fort Zombie": {
      "Vedykar": 142,
      "Gatherhold": 262
    },
    "Krona Peak": {
      "Irontown": 104
    },
    "Irontown": {
      "Krona Peak": 104,
      "Vulyar": 315
    },
    "Vulyar": {
      "Irontown": 315,
      "Vedykar": 104
    },
    "Thaliost": {
      "Rekkenmark": 27,
      "Fairhaven": 361
    },
    "Gatherhold": {
      "Fort Zombie": 262
    },
    "Sharn": {
      "Wroat": 294
    },
    "Wroat": {
      "Sharn": 294,
      "Hatheril": 478,
      "Starilaskur": 617
    },
    "Hatheril": {
      "Wroat": 478,
      "Sword Keep": 106
    },
    "Sword Keep": {
      "Hatheril": 106,
      "Marketplace": 96
    },
    "Starilaskur": {
      "Wroat": 617,
      "Sterngate": 269,
      "Vathirond": 198
    },
    "Sterngate": {
      "Starilaskur": 269,
      "Zolanberg": 214
    },
    "Vathirond": {
      "Starilaskur": 198,
      "Aruldusk": 142
    },
    "Aruldusk": {
      "Vathirond": 142,
      "Sigilstar": 99
    },
    "Sigilstar": {
      "Aruldusk": 99,
      "Flamekeep": 194
    },
    "Flamekeep": {
      "Sigilstar": 194
    },
    "Marketplace": {
      "Sword Keep": 96,
      "Passage": 255
    },
    "Passage": {
      "Marketplace": 255,
      "Fairhaven": 227
    },
    "Fairhaven": {
      "Passage": 227,
      "Thaliost": 361
    },
    "Zolanberg": {
      "Sterngate": 214,
      "Korranberg": 195
    },
    "Korranberg": {
      "Zolanberg": 195
    }
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
  }
});

export const { startStationChange, finishStationChange, setMiles, setPath } = mainSlice.actions;

export const mainSelector = state => state.main;

export default mainSlice.reducer;