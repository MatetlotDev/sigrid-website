import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  actualImg: null,
};

export const pictureVisualSlice = createSlice({
  name: 'pictureVisual',
  initialState,
  reducers: {
    setOpen: ({ open }, { payload }) => {
      open = payload;
    },
    setActualImg: ({ actualImg }, { payload }) => {
      actualImg = payload;
    },
  },
});

export const { setOpen, setActualImg } = pictureVisualSlice.actions;

export default pictureVisualSlice.reducer;
