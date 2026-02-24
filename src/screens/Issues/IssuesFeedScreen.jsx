import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectFilteredIssues } from '../../store/selectors/selector';
import IssueSearchScreen from './IssueSearch';
import IssueList from '../../components/Issue/IssueList';
import { HeaderRight } from '../../components/Header/HeaderRight';

const IssuesFeedScreen = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const issues = useSelector(selectFilteredIssues);
  const navigation = useNavigation();

  const renderHeaderRight = useCallback(
    () => (
      <HeaderRight
        showSearchBar={showSearchBar}
        onCancel={() => setShowSearchBar(false)}
        onSearch={() => setShowSearchBar(true)}
        onAdd={() => navigation.navigate('CreateIssue')}
      />
    ),
    [showSearchBar, navigation],
  );

  useEffect(() => {
    navigation.setOptions({ headerRight: renderHeaderRight });
  }, [renderHeaderRight, navigation]);

  return (
    <>
      {showSearchBar && <IssueSearchScreen />}
      <IssueList issues={issues} />
    </>
  );
};

export default IssuesFeedScreen;
