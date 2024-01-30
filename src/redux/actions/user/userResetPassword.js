import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUserResetPassword = {
  userResetPassword: { data: null, loading: false, error: null },
};

export const userResetPassword = createAsyncThunk('user/userResetPassword', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/auth/password/reset/`, data, {
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

export const reducerUserResetPassword = {
  [userResetPassword.pending]: (state) => {
    state.userResetPassword.loading = true;
    state.userResetPassword.error = null;
  },
  [userResetPassword.fulfilled]: (state, action) => {
    state.userResetPassword.loading = false;
    state.userResetPassword.data = action.payload;
    state.userResetPassword.error = null;
  },
  [userResetPassword.rejected]: (state, action) => {
    state.userResetPassword.loading = false;
    state.userResetPassword.error = action.payload;
  },
};
