import { configureStore } from '@reduxjs/toolkit';
import newProductSlice from '../feature/newProductSlice';
import categoriesSlice from '../feature/categoriesSlice';
import loaderSlice from '../feature/loaderSlice';
import authSlice from '../feature/authSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here
    newProduct:newProductSlice,
        categories:categoriesSlice,
        loader:loaderSlice,
        auth:authSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
