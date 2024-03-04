import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUserProfile = {
  userProfile: { data: null, loading: false, error: null },
};

export const userProfile = createAsyncThunk('user/userProfile', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/auth/profile/`, {
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

export const reducerUserProfile = {
  [userProfile.pending]: (state) => {
    state.userProfile.loading = true;
  },
  [userProfile.fulfilled]: (state, action) => {
    state.userProfile.loading = false;
    state.userProfile.data = action.payload;
    state.userProfile.error = null;
  },
  [userProfile.rejected]: (state, action) => {
    state.userProfile.loading = false;
    state.userProfile.error = true;
  },
};
