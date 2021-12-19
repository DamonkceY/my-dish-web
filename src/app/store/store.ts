import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenticationReducer from './storeModules/authentication/authenticationSlice'
import rootReducer from './storeModules/root/root'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    root: rootReducer
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
