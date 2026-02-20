import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    status: [],
    type: [],
    category: [],
    location: [],
    search: '',
  },
  reducers: {
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      const current = state[filterType];
      if (filterType === 'search') {
        state.search = value;
        return;
      }
      const index = current.indexOf(value);
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
    },
    resetFilter: state => {
      state.status = [];
      state.type = [];
      state.category = [];
      state.location = [];
      state.search = '';
    },
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
