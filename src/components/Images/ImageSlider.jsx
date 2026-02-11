import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import COLORS from '../../utils/constants';
import ImageModal from './ImageModal';
import ImageWithEditsPreview from './ImageWithEditsPreview';

const { width } = Dimensions.get('window');

const ImageSlider = ({ images = [], edits = [], onEditChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);

  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <>
      <View>
        <FlatList
          ref={flatListRef}
          data={images}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                setPreviewVisible(true);
                setActiveIndex(index);
              }}
            >
              <ImageWithEditsPreview
                imageUri={item}
                paths={edits[index] || []}
                style={styles.image}
              />
            </Pressable>
          )}
        />
        <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      <ImageModal
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        images={images}
        edits={edits}
        onEditChange={onEditChange}
        initialIndex={activeIndex}
      />
    </>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  image: {
    width,
    height: 220,
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: COLORS.primary,
    width: 10,
  },
});
