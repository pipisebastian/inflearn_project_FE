import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

const initialState: String[] = ['코딩', '프론트엔드', '백엔드'];

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      return state.filter((tag) => tag !== action.payload);
    },
  },
});

export const { addTag, deleteTag } = tagSlice.actions;

export const selectTag = (state: RootState) => state.tag;

export default tagSlice.reducer;
