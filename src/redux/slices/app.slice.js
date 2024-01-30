import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  theme: 1,
  activeSmartBlock: 'SWOT',
  activeSmartView: 'grid',
  showUserModal: false,
  activeSettingOption: 'Edit profile',
  activeLang: 'English',
  collapseLeftSideBar: false,
  collapseRightSideBar: false,
  showSwipeBottom: false,
  showLeftMenu: false,
  showStepModal: false,
  showTips: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setActiveSmartBlock(state, action) {
      state.activeSmartBlock = action.payload;
    },
    setActiveSmartView(state, action) {
      state.activeSmartView = action.payload;
    },
    setShowUserModal(state, action) {
      state.showUserModal = action.payload;
    },
    setActiveSettingOption(state, action) {
      state.activeSettingOption = action.payload;
    },
    setActiveLang(state, action) {
      state.activeLang = action.payload;
    },
    setCollapseLeftSideBar(state, action) {
      state.collapseLeftSideBar = action.payload;
    },
    setCollapseRightSideBar(state, action) {
      state.collapseRightSideBar = action.payload;
    },
    setShowSwipeBottom(state, action) {
      state.showSwipeBottom = action.payload;
    },
    setShowLeftMenu(state, action) {
      state.showLeftMenu = action.payload;
    },
    setShowStepModal(state, action) {
      state.showStepModal = action.payload;
    },
    setShowTips(state, action) {
      state.showTips = action.payload;
    },
  },
  extraReducers: {},
});
export const { setTheme, setActiveSmartBlock, setActiveSmartView, setShowUserModal, setActiveSettingOption, setActiveLang, setCollapseLeftSideBar, setCollapseRightSideBar, setShowSwipeBottom, setShowLeftMenu, setShowStepModal, setShowTips } = appSlice.actions;
export const appReducer = appSlice.reducer;
