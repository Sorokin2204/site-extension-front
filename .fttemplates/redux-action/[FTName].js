import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initState[FTName | capitalize] = {
  [FTName]: { data: null, loading: false, error: null },
};

export const [FTName] = createAsyncThunk('user/[FTName]', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/user/list`)
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducer[FTName | capitalize] = {
  [[FTName].pending]: (state) => {
    state.[FTName].loading = true;
  },
  [[FTName].fulfilled]: (state, action) => {
    state.[FTName].loading = false;
    state.[FTName].data = action.payload;
    state.[FTName].error = null;
  },
  [[FTName].rejected]: (state, action) => {
    state.[FTName].loading = false;
    state.[FTName].error = action.payload;
  },
};
