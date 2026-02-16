import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import COLORS from '../../utils/constants';
import ImageModal from './ImageModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_SIZE = (SCREEN_WIDTH - 20) / 2;

const ImageSlider = ({
  images = [],
  edits = [],
  onImageEdited,
  readOnly = false,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderItem = ({ item, index }) => (
    <Pressable
      style={styles.imageWrapper}
      onPress={() => {
        setSelectedIndex(index);
        setPreviewVisible(true);
      }}
    >
      <View style={styles.imageCard}>
        <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
      </View>
    </Pressable>
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
        />
      </View>

      <ImageModal
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        images={images}
        onEditChange={onImageEdited}
        initialIndex={selectedIndex}
        readOnly={readOnly}
      />
    </>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  row: {
    justifyContent: 'flex-start',
    marginHorizontal: -8,
  },

  imageWrapper: {
    width: '50%',
    padding: 8,
  },

  imageCard: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
});
