import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenticationSlice from 'features/authentication/authenticationSlice';
import layoutSlice from 'features/layout/layoutSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authenticationSlice);

export const store = configureStore({
  reducer: {
    layout: layoutSlice,
    auth: persistedReducer,
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
export const persistor = persistStore(store);
