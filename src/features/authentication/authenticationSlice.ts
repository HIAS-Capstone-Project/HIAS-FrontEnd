import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { toggleSiderBar } from 'features/layout/layoutSlice';
import { ILoginParams } from 'pages/login/types';
import { AuthService } from 'services';

export interface IAuthSlice {
  user: string;
  loading: boolean;
}

const initialState: IAuthSlice = {
  user: '',
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (param: ILoginParams, thunkAPI) => {
    const res = await AuthService.login(param);
    thunkAPI.dispatch(toggleSiderBar());
    return res.data;
  },
);

const authSilce = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: state => {
      state.user = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, state => {
        state.loading = false;
      });
  },
});

export const { setUser, logOut } = authSilce.actions;

export default authSilce.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
