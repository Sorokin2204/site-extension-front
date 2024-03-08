import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateTariffPayment = {
  tariffPayment: { data: null, loading: false, error: null },
};

export const tariffPayment = createAsyncThunk('tariff/tariffPayment', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .post(
      `${process.env.REACT_APP_SERVER_API}/payments/`,
      { tariff_id: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Connection: 'keep-alive',
        },
      },
    )
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerTariffPayment = {
  [tariffPayment.pending]: (state) => {
    state.tariffPayment.loading = true;
  },
  [tariffPayment.fulfilled]: (state, action) => {
    state.tariffPayment.loading = false;
    state.tariffPayment.data = action.payload;
    state.tariffPayment.error = null;
  },
  [tariffPayment.rejected]: (state, action) => {
    state.tariffPayment.loading = false;
    state.tariffPayment.error = true;
  },
};
