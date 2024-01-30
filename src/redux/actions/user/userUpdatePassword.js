import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUserUpdatePassword = {
  userUpdatePassword: { data: null, loading: false, error: null },
};

export const userUpdatePassword = createAsyncThunk('user/userUpdatePassword', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/auth/password/change/`, data, {
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
      console.log(res);
      return rejectWithValue(res.response.data);
    });
});

export const reducerUserUpdatePassword = {
  [userUpdatePassword.pending]: (state) => {
    state.userUpdatePassword.loading = true;
    state.userUpdatePassword.error = null;
  },
  [userUpdatePassword.fulfilled]: (state, action) => {
    state.userUpdatePassword.loading = false;
    state.userUpdatePassword.data = action.payload;
    state.userUpdatePassword.error = null;
  },
  [userUpdatePassword.rejected]: (state, action) => {
    state.userUpdatePassword.loading = false;
    state.userUpdatePassword.error = action.payload;
  },
};
