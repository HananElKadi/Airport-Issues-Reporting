import { View, StyleSheet } from 'react-native';
import {
  CancelSearchButton,
  HeaderSearchButton,
  HeaderAddButton,
} from './HeaderButtons';

export const HeaderRight = ({ showSearchBar, onCancel, onSearch, onAdd }) =>
  showSearchBar ? (
    <View style={styles.headerRight}>
      <CancelSearchButton onPress={onCancel} />
    </View>
  ) : (
    <View style={styles.headerRight}>
      <HeaderSearchButton onPress={onSearch} />
      <HeaderAddButton onPress={onAdd} />
    </View>
  );

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
