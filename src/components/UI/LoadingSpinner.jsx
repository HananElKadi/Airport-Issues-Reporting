import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text } from 'react-native';
import COLORS from '../../utils/constants';

const LoadingSpinner = ({ visible, message }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View>
          <ActivityIndicator size="large" color={COLORS.info} />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)', // slightly darker overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    color: COLORS.info,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LoadingSpinner;
