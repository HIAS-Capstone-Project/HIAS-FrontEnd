import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import ROLE from 'constants/roles';
import { toggleSiderBar } from 'features/layout/layoutSlice';
import _ from 'lodash';
import { ILoginParams, IUserInfoParams } from 'pages/login/types';
import { AuthService } from 'services';
import { findMemberByMemberNo } from 'services/member.service';
import { LocalStorageUtil } from 'utils';

export interface IAuthSlice {
  user?: any;
  info?: any;
  loading: boolean;
}

const initialState: IAuthSlice = {
  // user: null,
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (param: ILoginParams, thunkAPI) => {
    const res = await AuthService.login(param);
    thunkAPI.dispatch(toggleSiderBar());
    return res;
  },
);

export const getInfoUser = createAsyncThunk(
  'auth/get-info',
  async (params: IUserInfoParams) => {
    const { role, primaryKey } = params;
    let res;
    switch (role) {
      case ROLE.MEMBER:
        res = await findMemberByMemberNo(primaryKey);
        return res;
    }
  },
);

const authSilce = createSlice({
  name: '@auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: state => {
      state.user = null;
      LocalStorageUtil.removeSessionInfo();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (!_.isEmpty(action.payload)) {
          LocalStorageUtil.setSessionInfo({
            token: action.payload?.access_token,
            role: action.payload?.role,
            primaryKey: action.payload?.primary_key.toString(),
          });
        }
        state.user = { ...action.payload, isLogined: true };
      })
      .addCase(login.rejected, state => {
        state.loading = false;
      })
      .addCase(getInfoUser.pending, state => {
        state.loading = true;
      })
      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.loading = false;
        state.info = { ...action.payload };
      })
      .addCase(getInfoUser.rejected, state => {
        state.loading = false;
      });
  },
});

export const { setUser, logOut } = authSilce.actions;

export default authSilce.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectUserInfo = (state: RootState) => state.auth.info;
