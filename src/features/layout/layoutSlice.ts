import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface ILayoutSlice {
  sidebarCollapsed: boolean;
}

const initialState: ILayoutSlice = {
  sidebarCollapsed: false,
};

const layoutSilce = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSiderBar: state => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
});

export const { toggleSiderBar } = layoutSilce.actions;

export const selectLayout = (state: RootState) => state.layout;

export default layoutSilce.reducer;
