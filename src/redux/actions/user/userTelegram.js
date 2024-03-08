import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUserTelegram = {
  userTelegram: { data: null, loading: false, error: null },
};

export const userTelegram = createAsyncThunk('user/userTelegram', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/auth/profile/telegram-auth/`, data, {
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

export const reducerUserTelegram = {
  [userTelegram.pending]: (state) => {
    state.userTelegram.loading = true;
  },
  [userTelegram.fulfilled]: (state, action) => {
    state.userTelegram.loading = false;
    state.userTelegram.data = action.payload;
    state.userTelegram.error = null;
  },
  [userTelegram.rejected]: (state, action) => {
    state.userTelegram.loading = false;
    state.userTelegram.error = action.payload;
  },
};
