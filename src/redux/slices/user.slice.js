import { createSlice } from '@reduxjs/toolkit';
import { initStateUserSignUp, reducerUserSignUp } from '../actions/user/userSignUp';
import { initStateUserSignIn, reducerUserSignIn } from '../actions/user/userSignIn';
import { initStateUserAuth, reducerUserAuth } from '../actions/user/userAuth';
import { initStateUserUpdate, reducerUserUpdate } from '../actions/user/userUpdate';
import { initStateUserResetPassword, reducerUserResetPassword } from '../actions/user/userResetPassword';
import { initStateUserProfile, reducerUserProfile } from '../actions/user/userProfile';
import { initStateUserProfileUpdate, reducerUserProfileUpdate } from '../actions/user/userProfileUpdate';
import { initStateUserUpdatePassword, reducerUserUpdatePassword } from '../actions/user/userUpdatePassword';
import { initStateUserStatistics, reducerUserStatistics } from '../actions/user/userStatistics';
import { initStateUserStatisticMonth, reducerUserStatisticMonth } from '../actions/user/userStatisticMonth';
import { initStateUserTelegram, reducerUserTelegram } from '../actions/user/userTelegram';
export const initialState = {
  ...initStateUserSignUp,
  ...initStateUserSignIn,
  ...initStateUserAuth,
  ...initStateUserUpdate,
  ...initStateUserResetPassword,
  ...initStateUserProfile,
  ...initStateUserProfileUpdate,
  ...initStateUserUpdatePassword,
  ...initStateUserStatistics,
  ...initStateUserStatisticMonth,
  ...initStateUserTelegram,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserAuth(state, action) {
      state.userAuth = initStateUserAuth.userAuth;
    },
    resetUserProfile(state, action) {
      state.userProfile = initStateUserProfile.userProfile;
    },
    resetUserSignIn(state, action) {
      state.userSignIn = initStateUserSignIn.userSignIn;
    },
    resetUserSignUp(state, action) {
      state.userSignUp = initStateUserSignUp.userSignUp;
    },
    resetUserResetPassword(state, action) {
      state.userResetPassword = initStateUserResetPassword.userResetPassword;
    },
    resetUserUpdate(state, action) {
      state.userUpdate = initStateUserUpdate.userUpdate;
    },
    resetUserProfileUpdate(state, action) {
      state.userProfileUpdate = initStateUserProfileUpdate.userProfileUpdate;
    },
    resetUserUpdatePassword(state, action) {
      state.userUpdatePassword = initStateUserUpdatePassword.userUpdatePassword;
    },
    resetUserTelegram(state, action) {
      state.userTelegram = initStateUserTelegram.userTelegram;
    },
  },
  extraReducers: {
    ...reducerUserSignUp,
    ...reducerUserSignIn,
    ...reducerUserAuth,
    ...reducerUserUpdate,
    ...reducerUserResetPassword,
    ...reducerUserProfile,
    ...reducerUserProfileUpdate,
    ...reducerUserUpdatePassword,
    ...reducerUserStatistics,
    ...reducerUserStatisticMonth,
    ...reducerUserTelegram,
  },
});
export const { resetUserSignUp, resetUserSignIn, resetUserResetPassword, resetUserUpdate, resetUserProfileUpdate, resetUserUpdatePassword, resetUserAuth, resetUserProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;
