import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import COLORS from '../../utils/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import resizeImage from '../../services/resizeImage';

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
        const newDimensions = result.assets.map(asset => ({
          width: asset.width,
          height: asset.height,
        }));
        onPick(newPhotos, newDimensions);
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
      <MaterialIcons name="upload" size={26} color={COLORS.textInverse} />
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
