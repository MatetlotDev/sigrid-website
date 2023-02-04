import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  msgSent: false,
};

export const contactSlice = createSlice({
  name: 'contactSlice',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setMsgSent: (state, { payload }) => {
      state.msgSent = payload;
    },
  },
});

export default contactSlice.reducer;

// Actions
export const { setLoading, setMsgSent } = contactSlice.actions;

// Selectors
export const selectContactLoading = (state) => state.contactReducer.loading;
export const selectMsgSent = (state) => state.contactReducer.msgSent;
