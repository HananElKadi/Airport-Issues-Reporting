import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text } from 'react-native';
import COLORS from '../../utils/constants';

const LoadingSpinner = ({ visible, message }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View>
          <ActivityIndicator size="large" color={COLORS.textPrimary} />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.hoverBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LoadingSpinner;
