import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { Note } from '../../type';

const initialState: Note[] = [
  {
    id: 1,
    title: 'NOTE 1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ',
    selectedTags: ['코딩', '프론트엔드'],
    createdAt: new Date('2024-01-01 12:20:30'),
    isHighPriority: true,
    isPinned: true,
    backgroundColor: 'WHITE',
    state: 'ACTIVE',
  },
  {
    id: 2,
    title: 'NOTE 2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor   ',
    selectedTags: ['코딩', '백엔드'],
    createdAt: new Date('2020-03-01 12:20:30'),
    isHighPriority: false,
    isPinned: true,
    backgroundColor: 'SKY',
    state: 'ACTIVE',
  },
  {
    id: 3,
    title: 'NOTE 3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor   ',
    selectedTags: ['프론트엔드', '백엔드'],
    createdAt: new Date('2024-03-01 12:20:30'),
    isHighPriority: false,
    isPinned: true,
    backgroundColor: 'WHITE',
    state: 'ACTIVE',
  },
  {
    id: 4,
    title: 'NOTE 4',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,  ',
    selectedTags: ['코딩'],
    createdAt: new Date('2024-01-11 12:20:30'),
    isHighPriority: true,
    isPinned: false,
    backgroundColor: 'SKY',
    state: 'ACTIVE',
  },
];

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },

    deleteNote: (state, action) => {
      return state.filter((note) => note.id !== action.payload.id);
    },

    editNote: (state, action) => {
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            ...action.payload,
          };
        }
        return note;
      });
    },

    changePinned: (state, action) => {
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            isPinned: !note.isPinned,
          };
        }
        return note;
      });
    },

    changeState: (state, action) => {
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            state: action.payload.state,
          };
        }
        return note;
      });
    },

    sortPriorityLow: (state) => {
      return state.sort((a, b) => {
        return a.isHighPriority === b.isHighPriority ? 0 : a.isHighPriority ? 1 : -1;
      });
    },
    sortPriorityHigh: (state) => {
      return state.sort((a, b) => {
        return a.isHighPriority === b.isHighPriority ? 0 : a.isHighPriority ? -1 : 1;
      });
    },

    sortDateLatest: (state) => {
      return state.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1;
      });
    },

    sortDateOldest: (state) => {
      return state.sort((a, b) => {
        return a.createdAt < b.createdAt ? -1 : 1;
      });
    },
  },
});

export const {
  addNote,
  deleteNote,
  editNote,
  changePinned,
  changeState,
  sortPriorityLow,
  sortPriorityHigh,
  sortDateLatest,
  sortDateOldest,
} = noteSlice.actions;

export const selectNote = (state: RootState) => state.note;

export default noteSlice.reducer;
