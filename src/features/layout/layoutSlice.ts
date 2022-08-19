import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface ILayoutSlice {
  sidebarCollapsed: boolean;
  isloading: boolean;
}

const initialState: ILayoutSlice = {
  sidebarCollapsed: true,
  isloading: false,
};

const layoutSilce = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSiderBar: state => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    showLoading: (state, action) => {
      state.isloading = action.payload;
    },
  },
});

export const { toggleSiderBar, showLoading } = layoutSilce.actions;

export const selectLayout = (state: RootState) => state.layout;

export default layoutSilce.reducer;
