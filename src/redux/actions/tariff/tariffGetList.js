import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateTariffGetList = {
  tariffGetList: { data: null, loading: false, error: null },
};

export const tariffGetList = createAsyncThunk('tariff/tariffGetList', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/tariffs/`, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Connection: 'keep-alive',
      },
    })
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      console.log(res);
      return rejectWithValue(res.response.data);
    });
});

export const reducerTariffGetList = {
  [tariffGetList.pending]: (state) => {
    state.tariffGetList.loading = true;
    state.tariffGetList.error = null;
  },
  [tariffGetList.fulfilled]: (state, action) => {
    state.tariffGetList.loading = false;
    state.tariffGetList.data = action.payload;
    state.tariffGetList.error = null;
  },
  [tariffGetList.rejected]: (state, action) => {
    state.tariffGetList.loading = false;
    state.tariffGetList.error = action.payload;
  },
};
