import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenticationSlice from 'features/authentication/authenticationSlice';
import counterReducer from 'features/counter/counterSlice';
import layoutSlice from 'features/layout/layoutSlice';

export const store = configureStore({
  reducer: {
    layout: layoutSlice,
    counter: counterReducer,
    auth: authenticationSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
