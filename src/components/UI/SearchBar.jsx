import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import COLORS from '../../utils/constants';

const SearchBar = ({ placeholder = 'Search...', onSearch, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    onSearch && onSearch(query);
  }, [query, onSearch]);
  const handleClear = () => {
    setQuery('');
    onSearch && onSearch('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textTertiary}
        returnKeyType="search"
      />

      {/* {query.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearIcon}>✕</Text>
        </TouchableOpacity>
      )} */}
      <Text style={styles.icon}>⌕</Text>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceRaised,
    borderRadius: 30,
    paddingHorizontal: 12,
    // paddingVertical: 5,
    marginHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  icon: {
    fontSize: 40,
    marginHorizontal: 8,
    color: COLORS.primary,
    transform: [{ rotate: '295deg' }],
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 6,
  },
  clearIcon: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});
