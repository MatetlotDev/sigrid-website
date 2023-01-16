import { createSlice } from '@reduxjs/toolkit';
import { pictures } from '../../../constants';

const initialState = {
  open: false,
  actualImg: null,
};

export const pictureVisualSlice = createSlice({
  name: 'pictureVisual',
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

export default pictureVisualSlice.reducer;

// Actions
export const { setOpen, nextImg, prevImg, setImg } = pictureVisualSlice.actions;

// Selectors
export const selectOpen = (state) => state.PictureVisualReducer.open;
export const selectActualImg = (state) => state.PictureVisualReducer.actualImg;
