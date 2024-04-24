import { configureStore } from '@reduxjs/toolkit';
import { pizzaApi } from './pizzaApi';
import pizzaReducer from './pizzaSlice';


const resetStore = () => configureStore({
  reducer: {
    // add your reducer(s) here

    [pizzaApi.reducerPath]: pizzaApi.reducer
  },
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
    pizzaApi.middleware
  ),
})

export const store = resetStore()
