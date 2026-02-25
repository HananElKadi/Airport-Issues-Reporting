import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FieldRow from './FieldRow';
import CustomDropDown from '../../UI/CustomDropdown';
import COLORS from '../../../utils/constants';

const FieldDropdown = ({
  label,
  error,
  list,
  value,
  onChange,
  placeholder,
  readOnly,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) onSave();
  };

  return (
    <FieldRow label={label} error={error}>
      <View style={styles.row}>
        <View style={styles.dropdownWrapper}>
          <CustomDropDown
            list={list}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly || (!readOnly && !isEditing && onSave)}
          />
        </View>

        {!readOnly && !isEditing && onSave && (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            style={styles.iconBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="edit" size={18} color={COLORS.primary100} />
          </TouchableOpacity>
        )}

        {!readOnly && isEditing && (
          <TouchableOpacity
            onPress={handleSave}
            style={styles.iconBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="check" size={18} color={COLORS.primary100} />
          </TouchableOpacity>
        )}
      </View>
    </FieldRow>
  );
};

export default FieldDropdown;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownWrapper: {
    flex: 1,
  },
  iconBtn: {
    marginLeft: 8,
  },
});
