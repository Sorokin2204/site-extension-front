import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUserStatisticMonth = {
  userStatisticMonth: { data: null, loading: false, error: null },
};

export const userStatisticMonth = createAsyncThunk('user/userStatisticMonth', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/auth/profile/monthly-statistics/${data}/`, {
      headers: { Authorization: `Bearer ${token}` },
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Connection: 'keep-alive',
    })
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerUserStatisticMonth = {
  [userStatisticMonth.pending]: (state) => {
    state.userStatisticMonth.loading = true;
  },
  [userStatisticMonth.fulfilled]: (state, action) => {
    state.userStatisticMonth.loading = false;
    state.userStatisticMonth.data = action.payload;
    state.userStatisticMonth.error = null;
  },
  [userStatisticMonth.rejected]: (state, action) => {
    state.userStatisticMonth.loading = false;
    state.userStatisticMonth.error = action.payload;
    state.userStatisticMonth.data = null;
  },
};
