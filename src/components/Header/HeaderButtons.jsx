import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../../utils/constants';

export const MenuButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.menuButton}>
    <Text style={styles.menuButtonText}>☰</Text>
  </TouchableOpacity>
);

export const HeaderAddButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.headerRightButton}>
    <Text style={styles.headerAddButtonText}>+</Text>
  </TouchableOpacity>
);

export const HeaderSearchButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.headerRightButton}>
    <Text style={styles.headerSearchButtonText}>⌕</Text>
  </TouchableOpacity>
);

export const CancelSearchButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.cancelSearchButton}>
    <Text style={styles.cancelSearchButtonText}>✕</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 16,
  },
  menuButtonText: {
    fontSize: 26,
    color: COLORS.textInverse,
  },
  headerRightButton: {
    marginRight: 16,
  },
  headerAddButtonText: {
    fontSize: 30,
    color: COLORS.textInverse,
  },
  headerSearchButtonText: {
    fontSize: 30,
    color: COLORS.textInverse,
    transform: [{ rotate: '295deg' }],
  },
  cancelSearchButton: {
    marginTop: 20,
    marginRight: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.hoverBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelSearchButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textInverse,
    lineHeight: 20,
  },
});
