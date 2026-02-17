import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import COLORS from '../../utils/constants';
const CameraButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.outer}>
        <View style={styles.inner} />
      </View>
    </TouchableOpacity>
  );
};

export default CameraButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  outer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.hoverBg,
  },
  inner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.surface,
  },
});
