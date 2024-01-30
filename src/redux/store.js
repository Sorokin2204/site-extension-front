import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './slices/app.slice';
import { userReducer } from './slices/user.slice';
import { tariffReducer } from './slices/tariff.slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    tariff: tariffReducer,
  },
});
