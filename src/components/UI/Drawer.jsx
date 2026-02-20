import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter, resetFilter } from '../../store/slices/FilterSlice';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import COLORS from '../../utils/constants';
import { STATUS, CATEGORIES, LOCATIONS } from '../../utils/values';
export default function DrawerContent(props) {
  const dispatch = useDispatch();

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const activeCount =
    selectedStatus.length + selectedCategory.length + selectedLocation.length;

  const toggle = (setter, filterType, value) => {
    setter(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value],
    );
    dispatch(setFilter({ filterType, value }));
  };

  const handleReset = () => {
    setSelectedStatus([]);
    setSelectedCategory([]);
    setSelectedLocation([]);
    dispatch(resetFilter());
  };

  const renderStatusItem = ({ item: s }) => {
    const active = selectedStatus.includes(s);
    return (
      <TouchableOpacity
        onPress={() => toggle(setSelectedStatus, 'status', s)}
        style={[
          styles.statusChip,
          { backgroundColor: active ? COLORS.primary : COLORS.surface },
        ]}
        activeOpacity={0.75}
      >
        <Text
          style={[
            styles.statusText,
            { color: active ? COLORS.textInverse : COLORS.textSecondary },
          ]}
        >
          {s}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({ item: cat }) => {
    const active = selectedCategory.includes(cat);
    return (
      <TouchableOpacity
        onPress={() => toggle(setSelectedCategory, 'category', cat)}
        style={[styles.categoryCard, active && styles.categoryCardActive]}
        activeOpacity={0.75}
      >
        <Text
          style={[styles.categoryLabel, active && styles.categoryLabelActive]}
        >
          {cat}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderLocationItem = ({ item: loc }) => {
    const active = selectedLocation.includes(loc);
    return (
      <TouchableOpacity
        onPress={() => toggle(setSelectedLocation, 'location', loc)}
        style={[styles.locationCard, active && styles.locationCardActive]}
        activeOpacity={0.75}
      >
        <Text
          style={[styles.locationLabel, active && styles.locationLabelActive]}
        >
          {loc}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Filter Issues</Text>
        </View>
        {activeCount > 0 && (
          <TouchableOpacity
            onPress={handleReset}
            style={styles.resetBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.resetText}>RESET {activeCount}</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>STATUS</Text>
          <FlatList
            data={STATUS}
            horizontal
            scrollEnabled={false}
            keyExtractor={item => item}
            contentContainerStyle={styles.gap}
            renderItem={renderStatusItem}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CATEGORY</Text>
          <FlatList
            data={CATEGORIES}
            scrollEnabled={false}
            keyExtractor={item => item}
            numColumns={3}
            columnWrapperStyle={styles.gap}
            contentContainerStyle={styles.gap}
            renderItem={renderCategoryItem}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LOCATION</Text>
          <View style={styles.locationList}>
            <FlatList
              data={LOCATIONS}
              scrollEnabled={false}
              keyExtractor={item => item}
              contentContainerStyle={styles.gap}
              renderItem={renderLocationItem}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  gap: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 18,
    backgroundColor: COLORS.primary,
  },
  headerLeft: {},
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textInverse,
    letterSpacing: -0.3,
  },
  resetBtn: {
    backgroundColor: COLORS.focusRing,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  resetText: {
    fontSize: 12,
    color: COLORS.textInverse,
    fontWeight: '600',
  },

  scroll: {
    padding: 20,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
    color: COLORS.textTertiary,
    marginBottom: 10,
  },

  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 9,
    flex: 1,
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  categoryCard: {
    width: '30.5%',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  categoryCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  categoryLabelActive: {
    color: COLORS.textInverse,
    fontWeight: '700',
  },

  locationList: {
    gap: 8,
  },
  locationCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  locationCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  locationLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  locationLabelActive: {
    color: COLORS.textInverse,
    fontWeight: '700',
  },
});
