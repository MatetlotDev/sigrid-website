import { configureStore } from '@reduxjs/toolkit';
import homeSlice from '../pages/homepage/redux/homeSlice';

export const store = configureStore({
  reducer: {
    homeReducer: homeSlice,
  },
});
