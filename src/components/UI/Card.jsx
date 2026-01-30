import { StyleSheet, View } from 'react-native';
import React from 'react';
import COLORS from '../../utils/constants';

export default function Card(props) {
  return <View style={styles.card}>{props.children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 14,
    margin: 10,

    // iOS shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android shadow
    elevation: 4,

    // Optional border for structure
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
