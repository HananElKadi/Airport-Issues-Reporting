import { Text, View, StyleSheet } from 'react-native';
import Card from '../UI/Card';
import COLORS from '../../utils/constants';

const IssueCard = props => {
  return (
    <Card>
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {props.item.title}
        </Text>
        <View style={styles.statusWrapper}>
          <Text style={styles.status}>{props.item.status}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.label}>
              Category <Text style={styles.value}>{props.item.category}</Text>
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.label}>
              Reported <Text style={styles.value}>{props.item.reported}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.label}>
              Location <Text style={styles.value}>{props.item.location}</Text>
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.label}>
              Updated <Text style={styles.value}>{props.item.updated}</Text>
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default IssueCard;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: COLORS.secondary600,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    minHeight: 30,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textInverse,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  statusWrapper: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: COLORS.accent200,
    paddingHorizontal: 15,
    borderTopRightRadius: 8,
  },
  status: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: COLORS.textInverse,
  },

  body: {
    backgroundColor: COLORS.white,
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flexWrap: 'wrap',
  },
  value: {
    fontSize: 15,
    color: COLORS.textSecondary,
    letterSpacing: 0.8,
    fontWeight: '500',
    flexWrap: 'wrap',
    paddingLeft: 5,
  },
});
