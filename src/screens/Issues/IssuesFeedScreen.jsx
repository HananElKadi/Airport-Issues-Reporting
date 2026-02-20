import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectFilteredIssues } from '../../store/selectors/selector';
import COLORS from '../../utils/constants';
import IssueSearchScreen from './IssueSearchScreen';
import IssueList from '../../components/Issue/IssueList';

const IssuesFeedScreen = props => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const issues = useSelector(selectFilteredIssues);
  const navigation = useNavigation();

  const HeaderAddButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 16 }}>
      <Text style={{ fontSize: 26, color: COLORS.accent }}>+</Text>
    </TouchableOpacity>
  );

  const HeaderSearchButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 16 }}>
      <Text style={{ fontSize: 30, color: COLORS.accent }}>⌕</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <HeaderSearchButton onPress={() => setShowSearchBar(prev => !prev)} />
          <HeaderAddButton onPress={() => navigation.navigate('CreateIssue')} />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <>
      {showSearchBar && <IssueSearchScreen />}
      <IssueList issues={issues} />
    </>
  );
};

export default IssuesFeedScreen;
