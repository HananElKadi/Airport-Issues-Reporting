import { StyleSheet, View } from 'react-native';
import React from 'react';
import COLORS from '../../utils/constants';

export default function Card(props) {
  return <View style={styles.card}>{props.children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 8,

    // iOS shadow
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android shadow
    elevation: 4,
  },
});
