import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUserSignIn = {
  userSignIn: { data: null, loading: false, error: null },
};

export const userSignIn = createAsyncThunk('user/userSignIn', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/auth/login/`, data, {
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

export const reducerUserSignIn = {
  [userSignIn.pending]: (state) => {
    state.userSignIn.loading = true;
    state.userSignIn.error = null;
  },
  [userSignIn.fulfilled]: (state, action) => {
    state.userSignIn.loading = false;
    state.userSignIn.data = action.payload;
    state.userSignIn.error = null;
  },
  [userSignIn.rejected]: (state, action) => {
    state.userSignIn.loading = false;
    state.userSignIn.error = action.payload;
  },
};
