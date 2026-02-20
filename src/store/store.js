import { configureStore } from '@reduxjs/toolkit';
import IssueReducer from './slices/IssueSlice';
import FilterReducer from './slices/FilterSlice';

const store = configureStore({
  reducer: {
    issue: IssueReducer,
    filter: FilterReducer,
  },
});
export default store;
