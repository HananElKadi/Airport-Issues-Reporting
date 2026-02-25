import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '../../../utils/constants';
import Card from '../../UI/Card';
import formatDateParts from '../../../services/formatDate';
const CommentCard = ({ comment }) => {
  const { weekday, day, time } = formatDateParts(comment.createdAt);

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.day}>{weekday}</Text>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        <Text style={styles.message}>{comment.message}</Text>
      </View>
    </Card>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    elevation: 1,
    shadowColor: COLORS.shadowColor,
  },
  dateContainer: {
    width: 75,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  day: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textInverse,
  },
  time: {
    fontSize: 10,
    color: COLORS.textInverse,
  },
  message: {
    color: COLORS.textSecondary,
    fontSize: 18,
    // paddingVertical: 4,
    paddingHorizontal: 15,
    borderLeftRadius: 6,
  },
});
