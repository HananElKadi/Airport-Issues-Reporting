import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IssueCard from '../../components/Issue/IssueCard';
import { useSelector } from 'react-redux';
// import LoadingSpinner from '../../components/UI/LoadingSpinner';
// import ErrorModal from '../../components/UI/ErrorModal';

const IssuesFeedScreen = props => {
  const issues = useSelector(state => state.issue.issues);
  const navigation = useNavigation();
  console.log(issues);
  return (
    <>
      {/* <ErrorModal message={'Ya Lahwi'} /> */}
      {/* <AiOutputModal /> */}
      <FlatList
        data={issues}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailsForm', { item: item })}
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
