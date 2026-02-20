import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, Pressable, Image } from 'react-native';
import COLORS from '../../utils/constants';
import ImageModal from './ImageModal';

const THUMB_WIDTH = 150;
const THUMB_HEIGHT = 150;

const ImageSlider = ({ images = [], onImageEdited, readOnly = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const thumbListRef = useRef(null);

  const handleThumbPress = index => {
    setActiveIndex(index);
    setPreviewVisible(true);
  };

  const renderThumb = ({ item: uri, index }) => (
    <Pressable style={styles.thumbCard} onPress={() => handleThumbPress(index)}>
      <Image source={{ uri }} style={styles.thumbImage} resizeMode="cover" />
    </Pressable>
  );

  if (images.length === 0) return null;

  return (
    <>
      <FlatList
        ref={thumbListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderThumb}
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.thumbStrip}
        style={styles.thumbScroll}
      />

      <ImageModal
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        images={images}
        onEditChange={onImageEdited}
        initialIndex={activeIndex}
        readOnly={readOnly}
      />
    </>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  thumbScroll: {
    marginVertical: 8,
  },

  thumbStrip: {
    paddingHorizontal: 16,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  thumbCard: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: COLORS.backdrop,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },

  thumbImage: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    borderRadius: 14,
  },
});
