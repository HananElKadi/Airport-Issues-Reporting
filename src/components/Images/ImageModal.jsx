import {
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
  View,
  Text,
  Dimensions,
} from 'react-native';
import React from 'react';
import COLORS from '../../utils/constants';
import Canva from './Canva';
const { width, height } = Dimensions.get('window');
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState, useRef } from 'react';
import ViewShot from 'react-native-view-shot';
const ImageModal = ({
  visible,
  onClose,
  images = [],
  onEditChange,
  initialIndex = 0,
  readOnly = false,
}) => {
  const viewShotRefs = useRef({});

  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [temporaryPaths, setTemporaryPaths] = useState({});

  const flatListRef = useRef(null);
  const handleEditPress = () => {
    setIsEditing(true);
  };
  const handleFinishPress = async () => {
    try {
      const currentViewShot = viewShotRefs.current[currentIndex];

      if (!currentViewShot) {
        console.error('ViewShot ref not found for index:', currentIndex);
        setIsEditing(false);
        return;
      }
      const screenshotUri = await currentViewShot.capture();

      console.log('Screenshot captured successfully:', screenshotUri);
      if (onEditChange) {
        onEditChange(currentIndex, screenshotUri);
      }
      setTemporaryPaths(prev => {
        const updated = { ...prev };
        delete updated[currentIndex];
        return updated;
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      setIsEditing(false);
    }
  };
  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };
  const handleNewPath = (imageIndex, newPath) => {
    setTemporaryPaths(prev => {
      const currentPaths = prev[imageIndex] || [];
      return {
        ...prev,
        [imageIndex]: [...currentPaths, newPath],
      };
    });
  };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <GestureHandlerRootView style={styles.modalContainer}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
        {!readOnly && isEditing ? (
          <Pressable style={styles.finishButton} onPress={handleFinishPress}>
            <Text style={styles.buttonIcon}>✓</Text>
          </Pressable>
        ) : (
          !readOnly && (
            <Pressable style={styles.editButton} onPress={handleEditPress}>
              <Text style={styles.buttonIcon}>🖌️</Text>
            </Pressable>
          )
        )}
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={initialIndex}
          keyExtractor={(_, index) => index.toString()}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={({ item, index }) => (
            <View style={styles.imageWrapper}>
              <ViewShot
                ref={ref => (viewShotRefs.current[index] = ref)}
                options={{ format: 'png', quality: 0.8 }}
                style={styles.viewShotContainer}
              >
                <Canva
                  image={item}
                  isEditing={isEditing}
                  paths={temporaryPaths[index] || []}
                  onNewPath={newPath => handleNewPath(index, newPath)}
                />
              </ViewShot>
            </View>
          )}
        />
      </GestureHandlerRootView>
    </Modal>
  );
};
export default ImageModal;
const styles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: COLORS.background },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    color: 'white',
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 24,
  },
  editButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: { fontSize: 20 },
  imageWrapper: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewShotContainer: {
    width: '100%',
    height: '100%',
  },
});
