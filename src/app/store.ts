import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { trainsReducer } from '../features/trains/trainsSlice';
import { characteristicsReducer } from '../features/characteristics/characteristicsSlice';

export const store = configureStore({
  reducer: {
    trains: trainsReducer,
    selectedTrainInfo: characteristicsReducer,
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
