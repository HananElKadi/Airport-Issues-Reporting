import { createSlice } from '@reduxjs/toolkit';

const issueSlice = createSlice({
  name: 'issue',
  initialState: {
    issues: [],
  },
  reducers: {
    addIssue: (state, action) => {
      const newIssue = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        updated: new Date().toISOString(),
        ...action.payload,
      };
      state.issues.push(newIssue);
    },
    updateIssue: (state, action) => {
      const { id, data } = action.payload;
      const index = state.issues.findIndex(issue => issue.id === id);
      if (index !== -1) {
        state.issues[index] = {
          ...state.issues[index],
          ...data,
          updated: new Date().toISOString(),
        };
      }
    },
    removeIssue: (state, action) => {
      state.issues = state.issues.filter(issue => issue.id !== action.payload);
    },
    setIssue: (state, action) => {
      state.issues = action.payload;
    },
  },
});

export const { addIssue, updateIssue, removeIssue, setIssue } =
  issueSlice.actions;
export default issueSlice.reducer;
