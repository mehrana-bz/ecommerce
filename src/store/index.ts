import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reducers from './reducers';

export const store = configureStore({
  reducer: reducers,
  devTools:{trace:true}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;