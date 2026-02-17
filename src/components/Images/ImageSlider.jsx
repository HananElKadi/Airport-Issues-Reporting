import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  Text,
} from 'react-native';
import COLORS from '../../utils/constants';
import ImageModal from './ImageModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MAIN_WIDTH = SCREEN_WIDTH - 35;
const MAIN_HEIGHT = MAIN_WIDTH;

const THUMB_WIDTH = 120;
const THUMB_HEIGHT = 120;

const ImageSlider = ({ images = [], onImageEdited, readOnly = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const thumbListRef = useRef(null);

  const activeImage = images[activeIndex];

  const handleThumbPress = index => {
    setActiveIndex(index);
    thumbListRef.current?.scrollToIndex({
      index,
      viewPosition: 0.5,
      animated: true,
    });
  };

  const renderThumb = ({ item: uri, index }) => (
    <Pressable
      style={[
        styles.thumbCard,
        index === activeIndex && styles.thumbCardActive,
      ]}
      onPress={() => handleThumbPress(index)}
    >
      <Image source={{ uri }} style={styles.thumbImage} resizeMode="cover" />
    </Pressable>
  );

  if (images.length === 0) return null;

  return (
    <>
      <Pressable
        style={styles.mainCard}
        onPress={() => setPreviewVisible(true)}
        activeOpacity={0.95}
      >
        <Image
          source={{ uri: activeImage }}
          style={styles.mainImage}
          resizeMode="cover"
        />

        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>
            {activeIndex + 1}/{images.length}
          </Text>
        </View>
      </Pressable>

      <FlatList
        ref={thumbListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderThumb}
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.thumbStrip}
        style={styles.thumbScroll}
        onScrollToIndexFailed={({ index }) => {
          setTimeout(() => {
            thumbListRef.current?.scrollToIndex({
              index,
              viewPosition: 0.5,
              animated: true,
            });
          }, 200);
        }}
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
  mainCard: {
    width: MAIN_WIDTH,
    height: MAIN_HEIGHT,
    borderRadius: 18,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: COLORS.backdrop,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  mainImage: {
    width: '100%',
    height: '100%',
  },

  counterBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.hoverBg,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  counterText: {
    color: COLORS.textInverse,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  thumbScroll: {
    marginTop: 14,
    marginBottom: 8,
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
    overflow: 'visible',
    backgroundColor: COLORS.backdrop,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },

  thumbCardActive: {
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 8,
    transform: [{ scale: 1.04 }],
  },

  thumbImage: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    borderRadius: 14,
  },
});
