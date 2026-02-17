import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import COLORS from '../../utils/constants';

const ImagePicker = ({ onPick, maxPhotos = 5, currentCount = 0 }) => {
  const pickFromGallery = async () => {
    try {
      if (currentCount >= maxPhotos) return;

      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: maxPhotos - currentCount,
      });

      if (result.assets && result.assets.length > 0) {
        const newPhotos = result.assets.map(asset => asset.uri);
        onPick(newPhotos);
      }
    } catch (error) {
      console.error('Error picking from gallery:', error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.galleryButton}
      onPress={pickFromGallery}
      disabled={currentCount >= maxPhotos}
    >
      <Text style={styles.text}>U</Text>
    </TouchableOpacity>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  galleryButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.hoverBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  text: {
    color: COLORS.textInverse,
    fontSize: 20,
  },
});
