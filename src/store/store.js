import { configureStore } from '@reduxjs/toolkit';
import IssueReducer from './slices/IssueSlice';
const store = configureStore({
  reducer: {
    issue: IssueReducer,
  },
});
export default store;
