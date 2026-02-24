import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../../utils/constants';

const FieldRow = ({ label, error, children }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.valueRow}>{children}</View>
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

export default FieldRow;

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.hoverBg,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    color: COLORS.textInverse,
    width: 120,
    fontWeight: '400',
  },
  valueRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.error,
  },
});
