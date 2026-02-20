import { StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import IssueCard from './IssueCard';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useRef, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../utils/constants';
const IssueList = props => {
  const navigation = useNavigation();
  const swipeRefs = useRef(new Map());
  const [openRowId, setOpenRowId] = useState(null);
  const handleRowOpen = useCallback(
    itemId => {
      if (openRowId && openRowId !== itemId) {
        swipeRefs.current.get(openRowId)?.close();
      }
      setOpenRowId(itemId);
    },
    [openRowId],
  );
  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.rightAction}
      onPress={
        () => {}
        // navigation.navigate('DetailsForm', {
        //   item: { ...issues.find(i => i.id === openRowId), readOnly: false },
        // })
      }
    >
      <Text style={styles.actionText}>→</Text>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={props.issues}
      renderItem={({ item }) => (
        <Swipeable
          ref={ref => {
            if (ref) {
              swipeRefs.current.set(item.id, ref);
            } else {
              swipeRefs.current.delete(item.id);
            }
          }}
          friction={2}
          rightThreshold={40}
          renderRightActions={renderRightActions}
          onSwipeableOpen={() => handleRowOpen(item.id)}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailsForm', {
                item: item,
                readOnly: true,
              })
            }
          >
            <IssueCard item={item} />
          </TouchableOpacity>
        </Swipeable>
      )}
      keyExtractor={item => item.id}
    />
  );
};

export default IssueList;

const styles = StyleSheet.create({
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 25,
  },
  actionText: {
    fontSize: 50,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
});
