import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { trainsReducer } from '../features/trains/trainsSlice';

export const store = configureStore({
  reducer: {
    trains: trainsReducer,
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
