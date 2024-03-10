import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import noteReducer from '../slice/NoteSlice';
import tagReducer from '../slice/TagSlice';

export const store = configureStore({
  reducer: {
    note: noteReducer,
    tag: tagReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
