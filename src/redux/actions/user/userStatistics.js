import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUserStatistics = {
  userStatistics: { data: null, loading: false, error: null },
};

export const userStatistics = createAsyncThunk('user/userStatistics', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/auth/profile/statistics/`, {
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

export const reducerUserStatistics = {
  [userStatistics.pending]: (state) => {
    state.userStatistics.loading = true;
  },
  [userStatistics.fulfilled]: (state, action) => {
    state.userStatistics.loading = false;
    state.userStatistics.data = action.payload;
    state.userStatistics.error = null;
  },
  [userStatistics.rejected]: (state, action) => {
    state.userStatistics.loading = false;
    state.userStatistics.error = action.payload;
  },
};
