// src/features/sizeFilterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const sizeFilterSlice = createSlice({
  name: 'sizeFilter',
  initialState: 'All',
  reducers: {
    setSizeFilter: (state, action) => action.payload,
  },
});

// Export actions and reducer
export const { setSizeFilter } = sizeFilterSlice.actions;
export default sizeFilterSlice.reducer;
