import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface ILayoutSlice {
  sidebarCollapsed: boolean;
  roles: any;
  isPermission: boolean;
  isloading: boolean;
}

const initialState: ILayoutSlice = {
  sidebarCollapsed: true,
  roles: [],
  isPermission: false,
  isloading: false,
};

const layoutSilce = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSiderBar: state => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setPermissions: (state, action) => {
      state.isPermission = action.payload;
    },
    showLoading: (state, action) => {
      state.isloading = action.payload;
    },
  },
});

export const { toggleSiderBar, setRoles, setPermissions, showLoading } =
  layoutSilce.actions;

export const selectLayout = (state: RootState) => state.layout;
export const selectRoles = (state: RootState) => state.layout.roles;
export const selectPermission = (state: RootState) => state.layout.isPermission;

export default layoutSilce.reducer;
