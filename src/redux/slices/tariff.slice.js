import { createSlice } from '@reduxjs/toolkit';
import { initStateTariffGetList, reducerTariffGetList } from '../actions/tariff/tariffGetList';
import { initStateTariffPayment, reducerTariffPayment } from '../actions/tariff/tariffPayment';

export const initialState = {
  ...initStateTariffGetList,
  ...initStateTariffPayment,
};

export const tariffSlice = createSlice({
  name: 'tariff',
  initialState,
  reducers: {},
  extraReducers: {
    ...reducerTariffGetList,
    ...reducerTariffPayment,
  },
});
export const {} = tariffSlice.actions;
export const tariffReducer = tariffSlice.reducer;
