import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IssueCard from '../../components/Issue/IssueCard';
import { useSelector } from 'react-redux';

const IssuesFeedScreen = props => {
  const issues = useSelector(state => state.issue.issues);
  const navigation = useNavigation();
  console.log(issues);
  return (
    <>
      <FlatList
        data={issues}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailsForm', { item: item, readOnly: true })
            }
          >
            <IssueCard item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </>
  );
};
export default IssuesFeedScreen;
