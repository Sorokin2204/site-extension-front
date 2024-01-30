import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUserSignUp = {
  userSignUp: { data: null, loading: false, error: null },
};

export const userSignUp = createAsyncThunk('user/userSignUp', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/auth/registration/`, data, {
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
      return rejectWithValue(res.response.data);
    });
});

export const reducerUserSignUp = {
  [userSignUp.pending]: (state) => {
    state.userSignUp.loading = true;
  },
  [userSignUp.fulfilled]: (state, action) => {
    state.userSignUp.loading = false;
    state.userSignUp.data = action.payload;
    state.userSignUp.error = null;
  },
  [userSignUp.rejected]: (state, action) => {
    state.userSignUp.loading = false;
    state.userSignUp.error = action.payload;
  },
};
