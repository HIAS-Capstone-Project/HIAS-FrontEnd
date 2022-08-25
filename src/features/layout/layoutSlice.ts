import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface ILayoutSlice {
  sidebarCollapsed: boolean;
  roles: any;
  isPermission: boolean;
  clients: any;
  isloading: boolean;
  client: string;
}

const initialState: ILayoutSlice = {
  sidebarCollapsed: true,
  roles: [],
  isPermission: false,
  clients: [],
  isloading: false,
  client: '',
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
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    setClient: (state, action) => {
      state.client = action.payload;
    },
  },
});

export const {
  toggleSiderBar,
  setRoles,
  setPermissions,
  showLoading,
  setClients,
  setClient,
} = layoutSilce.actions;

export const selectLayout = (state: RootState) => state.layout;
export const selectRoles = (state: RootState) => state.layout.roles;
export const selectPermission = (state: RootState) => state.layout.isPermission;
export const selectClients = (state: RootState) => state.layout.clients;
export const selectClient = (state: RootState) => state.layout.client;

export default layoutSilce.reducer;
