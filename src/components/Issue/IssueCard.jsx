import { Text, View, StyleSheet } from 'react-native';
import Card from '../UI/Card';
import COLORS from '../../utils/constants';

const IssueCard = props => {
  return (
    <Card>
      <View style={styles.topRow}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.status}>{props.item.status}</Text>
      </View>

      <View style={styles.bottomGrid}>
        <View style={styles.column}>
          <Text style={styles.label}>
            Category: <Text style={styles.value}>{props.item.category}</Text>
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>
            Reported: <Text style={styles.value}>{props.item.reported}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.bottomGrid}>
        <View style={styles.column}>
          <Text style={styles.label}>
            Location: <Text style={styles.value}>{props.item.location}</Text>
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>
            Updated: <Text style={styles.value}>{props.item.updated}</Text>
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default IssueCard;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: COLORS.primary400,
    padding: 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textInverse,
    padding: 8,
  },
  status: {
    fontSize: 14,
    color: COLORS.textInverse,
    paddingRight: 4,
  },
  bottomGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    padding: 10,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
});
