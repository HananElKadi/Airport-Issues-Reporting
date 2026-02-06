import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import ImageModal from './ImageModal';

const ThubnailStack = props => {
  const [visible, setVisible] = useState(false);
  return (
    <TouchableOpacity
      style={styles.thumbnailContainer}
      onPress={() => {
        setVisible(true);
        // console.log('yalla');
      }}
    >
      {props.photos.length > 0 && (
        <View style={styles.thumbnailStack}>
          {props.photos.slice(0, 3).map((photo, index) => (
            <View
              key={index}
              style={[
                styles.thumbnail,
                {
                  zIndex: props.photos.length - index,
                  transform: [
                    { translateX: index * 8 },
                    { rotate: `${index * 3}deg` },
                  ],
                },
              ]}
            >
              <Image source={{ uri: photo }} style={styles.thumbnailImage} />
              {index === 0 && props.photos.length > 3 && (
                <View style={styles.morePhotosOverlay}>
                  <Text style={styles.morePhotosText}>
                    +{props.photos.length - 3}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
      <ImageModal
        visible={visible}
        images={props.photos}
        onClose={() => setVisible(false)}
      />
    </TouchableOpacity>
  );
};

export default ThubnailStack;

const styles = StyleSheet.create({
  thumbnailContainer: {
    position: 'absolute',
    bottom: 80, // Above submit button
    left: 20,
    width: 60,
    height: 60,
  },

  thumbnailStack: {
    position: 'relative',
    width: 60,
    height: 60,
  },

  thumbnail: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    backgroundColor: '#000',
  },

  thumbnailImage: {
    width: '100%',
    height: '100%',
  },

  morePhotosOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  morePhotosText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
