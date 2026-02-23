import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectFilteredIssues } from '../../store/selectors/selector';
import COLORS from '../../utils/constants';
import IssueSearchScreen from './IssueSearch';
import IssueList from '../../components/Issue/IssueList';

const IssuesFeedScreen = props => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const issues = useSelector(selectFilteredIssues);
  const navigation = useNavigation();

  const HeaderAddButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 16 }}>
      <Text style={{ fontSize: 30, color: COLORS.textInverse }}>+</Text>
    </TouchableOpacity>
  );

  const HeaderSearchButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 16 }}>
      <Text
        style={{
          fontSize: 30,
          color: COLORS.textInverse,
          transform: [{ rotate: '295deg' }],
        }}
      >
        ⌕
      </Text>
    </TouchableOpacity>
  );

  const CancelSearchButton = ({ onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 20,
        marginRight: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.hoverBg,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: COLORS.textInverse,
          lineHeight: 20,
        }}
      >
        ✕
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        showSearchBar ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CancelSearchButton onPress={() => setShowSearchBar(false)} />
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <HeaderSearchButton onPress={() => setShowSearchBar(true)} />
            <HeaderAddButton
              onPress={() => navigation.navigate('CreateIssue')}
            />
          </View>
        ),
    });
  }, [navigation, showSearchBar]);

  return (
    <>
      {showSearchBar && <IssueSearchScreen />}
      <IssueList issues={issues} />
    </>
  );
};

export default IssuesFeedScreen;
