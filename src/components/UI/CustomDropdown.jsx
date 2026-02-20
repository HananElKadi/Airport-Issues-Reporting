import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../../utils/constants';

const CustomDropDown = ({
  list,
  value,
  onChange,
  placeholder,
  readOnly = false,
}) => {
  const [open, setOpen] = useState(false);

  const selectedLabel = list.find(item => item === value) || value;

  const handleSelect = item => {
    onChange(item);
    setOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.trigger,
          readOnly && styles.triggerDisabled,
          open && styles.triggerOpen,
        ]}
        onPress={() => !readOnly && setOpen(prev => !prev)}
      >
        <Text
          style={[
            styles.triggerText,
            !value && styles.placeholder,
            readOnly && styles.triggerDisabled,
          ]}
        >
          {value ? selectedLabel : placeholder || 'Select an option'}
        </Text>
        <Text style={[styles.arrow, open && styles.arrowUp]}>▾</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownContainer}>
          {list.map((item, index) => (
            <View key={`${item}-${index}`}>
              <TouchableOpacity
                style={[styles.option, item === value && styles.optionSelected]}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    item === value && styles.optionTextSelected,
                  ]}
                >
                  {item}
                </Text>
                {item === value && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              {index < list.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
  },
  triggerOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: 'transparent',
  },
  triggerDisabled: {
    backgroundColor: COLORS.disabledBg,
    borderColor: COLORS.disabledBorder,
    color: COLORS.disabledText,
  },
  triggerText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    flex: 1,
  },
  placeholder: {
    color: COLORS.placeholder,
  },
  arrow: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  arrowUp: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionSelected: {
    backgroundColor: COLORS.primaryLight,
  },
  optionText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: COLORS.primary,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },
});
