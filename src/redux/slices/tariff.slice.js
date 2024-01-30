import { createSlice } from '@reduxjs/toolkit';
import { initStateTariffGetList, reducerTariffGetList } from '../actions/tariff/tariffGetList';

export const initialState = {
  ...initStateTariffGetList,
};

export const tariffSlice = createSlice({
  name: 'tariff',
  initialState,
  reducers: {},
  extraReducers: {
    ...reducerTariffGetList,
  },
});
export const {} = tariffSlice.actions;
export const tariffReducer = tariffSlice.reducer;
