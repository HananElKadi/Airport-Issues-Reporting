import ImageResizer from 'react-native-image-resizer';

const resizeImage = async imagePath => {
  try {
    const resizedImage = await ImageResizer.createResizedImage(
      imagePath,
      1024, // width
      768, // height
      'JPEG', // format
      80, // quality
    );
    return resizedImage;
  } catch (error) {
    console.error('Error resizing image:', error);
    throw error;
  }
};

export default resizeImage;
