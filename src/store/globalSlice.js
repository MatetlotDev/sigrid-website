import { createSlice } from '@reduxjs/toolkit';
import { pictures } from '../constants';

const initialState = {
  open: false,
  actualImg: null,
};

export const globalSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: {
    setOpen: (state, { payload }) => {
      state.open = payload;
    },
    setImg: (state, { payload }) => {
      state.actualImg = payload
        ? pictures.find((pic) => pic.id === payload.imgId)
        : null;
      state.open = !state.open;
    },
    nextImg: (state) => {
      state.actualImg = pictures[state.actualImg.id + 1];
    },
    prevImg: (state) => {
      state.actualImg = pictures[state.actualImg.id - 1];
    },
  },
});

export default globalSlice.reducer;

// Actions
export const { setOpen, nextImg, prevImg, setImg } = globalSlice.actions;

// Selectors
export const selectOpen = (state) => state.globalReducer.open;
export const selectActualImg = (state) => state.globalReducer.actualImg;