import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUserProfileUpdate = {
  userProfileUpdate: { data: null, loading: false, error: null },
};

export const userProfileUpdate = createAsyncThunk('user/userProfileUpdate', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .patch(
      `${process.env.REACT_APP_SERVER_API}/auth/profile/`,
      { login_kaspi: data?.login_kaspi, password_kaspi: data?.password_kaspi, id_store: data?.id_store },
      {
        headers: { Authorization: `Bearer ${token}` },
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Connection: 'keep-alive',
      },
    )
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerUserProfileUpdate = {
  [userProfileUpdate.pending]: (state) => {
    state.userProfileUpdate.loading = true;
  },
  [userProfileUpdate.fulfilled]: (state, action) => {
    state.userProfileUpdate.loading = false;
    state.userProfileUpdate.data = action.payload;
    state.userProfileUpdate.error = null;
  },
  [userProfileUpdate.rejected]: (state, action) => {
    state.userProfileUpdate.loading = false;
    state.userProfileUpdate.error = action.payload;
  },
};
