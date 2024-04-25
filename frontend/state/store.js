import { configureStore } from '@reduxjs/toolkit';
import { pizzaApi } from './pizzaApi';
import sizeFilterReducer from './sizeFilterSlice';

export const resetStore = () => configureStore({
  reducer: {
    [pizzaApi.reducerPath]: pizzaApi.reducer,
    sizeFilter: sizeFilterReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pizzaApi.middleware),
});


export const store = resetStore();