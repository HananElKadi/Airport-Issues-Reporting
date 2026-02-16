import { useEffect } from 'react';
import {
  useCameraDevice,
  useCameraPermission,
  Camera,
} from 'react-native-vision-camera';
import { View, Text, StyleSheet } from 'react-native';

const CaptureImage = ({ isFocused, camera }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    console.log('render');
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission || !device) {
    return (
      <View style={styles.center}>
        <Text>Camera not available</Text>
      </View>
    );
  }
  return (
    <Camera
      ref={camera}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isFocused}
      photo={true}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CaptureImage;
