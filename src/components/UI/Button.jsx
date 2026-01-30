import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../../utils/constants';

export default function Button({
  title,
  onPress,
  style,
  disabled = false,
  loading = false,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, disabled && styles.disabled, style]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',

    // iOS shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    // Android shadow
    elevation: 4,
  },

  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  disabled: {
    backgroundColor: COLORS.muted,
    elevation: 0,
    shadowOpacity: 0,
  },
});
