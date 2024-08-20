import { createSlice } from '@reduxjs/toolkit';
import { allPictures } from '../constants';

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
        ? allPictures.find((pic) => pic.id === payload.imgId)
        : null;
      state.open = !state.open;
    },
    nextImg: (state) => {
      const currentImgIdx = allPictures.findIndex(
        (img) => state.actualImg.id === img.id
      );
      const isLast = allPictures.length - 1 === currentImgIdx;

      state.actualImg = null;

      if (isLast) state.actualImg = allPictures[0];
      else state.actualImg = allPictures[currentImgIdx + 1];
    },
    prevImg: (state) => {
      const currentImgIdx = allPictures.findIndex(
        (img) => state.actualImg.id === img.id
      );
      const isFirst = currentImgIdx === 0;

      if (isFirst) state.actualImg = allPictures[allPictures.length - 1];
      else state.actualImg = allPictures[currentImgIdx - 1];
    },
  },
});

export default globalSlice.reducer;

// Actions
export const { setOpen, nextImg, prevImg, setImg } = globalSlice.actions;

// Selectors
export const selectOpen = (state) => state.globalReducer.open;
export const selectActualImg = (state) => state.globalReducer.actualImg;
