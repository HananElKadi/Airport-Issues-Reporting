import FieldRow from './FieldRow';
import { TextInput, StyleSheet } from 'react-native';
import COLORS from '../../../utils/constants';
const FieldInput = ({ label, error, readOnly, ...props }) => (
  <FieldRow label={label} error={!readOnly ? error : null}>
    <TextInput
      style={[styles.input, readOnly && styles.inputReadOnly]}
      placeholderTextColor={COLORS.accent200}
      editable={!readOnly}
      {...props}
    />
  </FieldRow>
);

export default FieldInput;
const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.primary100,
    padding: 0,
  },
  inputReadOnly: {
    color: COLORS.disabledText,
  },
});
