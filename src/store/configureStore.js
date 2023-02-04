import { configureStore } from '@reduxjs/toolkit';
import contactSlice from '../pages/contactPage/redux/contactSlice';
import homeSlice from '../pages/homepage/redux/homeSlice';
import globalSlice from './globalSlice';

export const store = configureStore({
  reducer: {
    homeReducer: homeSlice,
    contactReducer: contactSlice,
    globalReducer: globalSlice,
  },
});
