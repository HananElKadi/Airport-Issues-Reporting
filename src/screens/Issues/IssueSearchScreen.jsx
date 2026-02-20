import React, { useEffect } from 'react';
import SearchBar from '../../components/UI/SearchBar';
import { setFilter } from '../../store/slices/FilterSlice';
import { useDispatch } from 'react-redux';
const IssueSearchScreen = props => {
  const dispatch = useDispatch();
  const onSearch = query => {
    dispatch(setFilter({ filterType: 'search', value: query }));
  };
  useEffect(() => {
    return () => {
      dispatch(setFilter({ filterType: 'search', value: '' }));
    };
  }, [dispatch]);
  return (
    <>
      <SearchBar placeholder="Search issues..." onSearch={onSearch} />
    </>
  );
};
export default IssueSearchScreen;
