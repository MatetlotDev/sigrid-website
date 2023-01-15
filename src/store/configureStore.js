import { configureStore } from '@reduxjs/toolkit';
import homeSlice from '../pages/homepage/redux/homeSlice';
import PictureVisualSlice from '../components/PictureVisual/redux/PictureVisualSlice';

export const store = configureStore({
  reducer: {
    homeReducer: homeSlice,
    PictureVisualReducer: PictureVisualSlice,
  },
});
