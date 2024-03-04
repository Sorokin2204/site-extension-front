import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUserAuth = {
  userAuth: { data: null, loading: false, error: null },
};

export const userAuth = createAsyncThunk('user/userAuth', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/auth/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Connection: 'keep-alive',
      },
    })
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerUserAuth = {
  [userAuth.pending]: (state) => {
    state.userAuth.loading = true;
  },
  [userAuth.fulfilled]: (state, action) => {
    state.userAuth.loading = false;
    state.userAuth.data = action.payload;
    state.userAuth.error = null;
  },
  [userAuth.rejected]: (state, action) => {
    state.userAuth.loading = false;
    state.userAuth.error = true;
  },
};
