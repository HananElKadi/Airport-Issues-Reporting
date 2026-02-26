import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../../utils/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
        {!readOnly && (
          <Text style={[styles.arrow, open && styles.arrowUp]}>▾</Text>
        )}
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
                {item === value && (
                  <MaterialIcons
                    name="done"
                    size={16}
                    color={COLORS.secondary400}
                  />
                )}
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
    // paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: COLORS.transparent,
  },
  triggerOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: 'transparent',
  },
  triggerDisabled: {
    backgroundColor: COLORS.transparent,
    color: COLORS.disabledText,
  },
  triggerText: {
    fontSize: 16,
    color: COLORS.textInverse,
    flex: 1,
  },
  placeholder: {
    color: COLORS.accent200,
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
    backgroundColor: COLORS.transparent,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 15,
    color: COLORS.textInverse,
  },
  optionTextSelected: {
    color: COLORS.secondary400,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },
});
