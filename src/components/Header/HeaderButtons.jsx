import { TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../utils/constants';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const MenuButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.menuButton}>
    <SimpleLineIcons name="menu" size={26} color={COLORS.textInverse} />
  </TouchableOpacity>
);

export const HeaderAddButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.headerRightButton}>
    <MaterialIcons name="add" size={26} color={COLORS.textInverse} />
  </TouchableOpacity>
);

export const HeaderSearchButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.headerRightButton}>
    <MaterialIcons name="search" size={26} color={COLORS.textInverse} />
  </TouchableOpacity>
);

export const CancelSearchButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.cancelSearchButton}>
    <MaterialIcons name="close" size={26} color={COLORS.textInverse} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuButton: {
    marginTop: 5,
    marginLeft: 10,
  },
  headerRightButton: {
    marginRight: 16,
  },
  headerSearchButtonText: {
    fontSize: 30,
    color: COLORS.textInverse,
    transform: [{ rotate: '295deg' }],
  },
  cancelSearchButton: {
    marginTop: 20,
    marginRight: 12,
    width: 36,
    height: 36,
    borderRadius: 16,
    backgroundColor: COLORS.hoverBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
