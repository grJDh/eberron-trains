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
  rails4E: {
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
      "Vulyar": 147
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
      "Vedykar": 147
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
      "Sword Keep": 106,
	  "Starilaskur": 250,
    },
    "Sword Keep": {
      "Hatheril": 106,
      "Marketplace": 96
    },
    "Starilaskur": {
      "Wroat": 617,
      "Sterngate": 269,
      "Vathirond": 198,
	  "Hatheril": 250
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

  rails3E: {
    "Rekkenmark": {
      "Korth": 141,
      "Thaliost": 27
    },
    "Korth": {
      "Rekkenmark": 141,
      "Atur": 332
    },
    "Atur": {
      "Korth": 332,
      "Vedykar": 227
    },
    "Vedykar": {
      "Atur": 227,
      "Fort Zombie": 239,
      "Vulyar": 220
    },
    "Fort Zombie": {
      "Vedykar": 239,
      "Gatherhold": 262
    },
    "Krona Peak": {
      "Irontown": 262
    },
    "Irontown": {
      "Krona Peak": 262,
      "Vulyar": 456
    },
    "Vulyar": {
      "Irontown": 456,
      "Vedykar": 220
    },
    "Thaliost": {
      "Rekkenmark": 27,
      "Fairhaven": 617
    },
    "Gatherhold": {
      "Fort Zombie": 262
    },
    "Sharn": {
      "Wroat": 417
    },
    "Wroat": {
      "Sharn": 417,
      "Hatheril": 717,
      "Starilaskur": 939
    },
    "Hatheril": {
      "Wroat": 717,
      "Sword Keep": 150,
      "Starilaskur": 372,
    },
    "Sword Keep": {
      "Hatheril": 150,
      "Marketplace": 97
    },
    "Starilaskur": {
      "Wroat": 939,
      "Sterngate": 369,
      "Vathirond": 287,
      "Hatheril": 372,
    },
    "Sterngate": {
      "Starilaskur": 369,
      "Zolanberg": 386
    },
    "Vathirond": {
      "Starilaskur": 287,
      "Aruldusk": 262
    },
    "Aruldusk": {
      "Vathirond": 262,
      "Sigilstar": 166
    },
    "Sigilstar": {
      "Aruldusk": 166,
      "Flamekeep": 300
    },
    "Flamekeep": {
      "Sigilstar": 300
    },
    "Marketplace": {
      "Sword Keep": 97,
      "Passage": 369
    },
    "Passage": {
      "Marketplace": 369,
      "Fairhaven": 348
    },
    "Fairhaven": {
      "Passage": 348,
      "Thaliost": 617
    },
    "Zolanberg": {
      "Sterngate": 386,
      "Korranberg": 300
    },
    "Korranberg": {
      "Zolanberg": 300
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