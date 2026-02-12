import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  // useFrameProcessor,
  // runAtTargetFps,
  useCameraPermission,
  useCameraDevice,
  Camera,
} from 'react-native-vision-camera';
import CameraButton from '../../components/UI/CameraButton';
import Button from '../../components/UI/Button';
import ThubnailStack from '../../components/Images/ThubnailStack';
import ImagePicker from '../../components/Images/ImagePicker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AiOutputModal from '../../components/Issue/AiOutputModal';

const CreateIssueScreen = () => {
  const isFocused = useIsFocused();
  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   runAtTargetFps(1, () => {
  //     console.log(
  //       `Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`,
  //     );
  //   });
  // }, []);

  const navigation = useNavigation();
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [imageEdits, setImageEdits] = useState([]);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const MIN_PHOTOS = 3;
  const MAX_PHOTOS = 5;
  const canSubmit = capturedPhotos.length >= MIN_PHOTOS;
  const canTakePhoto = capturedPhotos.length < MAX_PHOTOS;
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: '',
    status: '',
    images: [],
    edits: [],
    location: '',
    reported: '',
  });

  const onEditChange = (index, newPaths) => {
    setImageEdits(prev => {
      const updated = [...prev];
      updated[index] = newPaths;
      return updated;
    });
    console.log('tam l edit ', imageEdits);
  };

  const [startAnalyze, setStartAnalyze] = useState(false);

  useEffect(() => {
    console.log('render');
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);
  useEffect(() => {
    console.log(imageEdits);
  }, [imageEdits]);

  const takePhoto = async () => {
    try {
      if (!camera.current) return;

      const photo = await camera.current.takePhoto();

      if (!photo?.path) return;
      setCapturedPhotos(prev => [...prev, `file://${photo.path}`]);
      setImageEdits(prev => [...prev, []]);
      console.log(capturedPhotos);
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const submitIssueHandler = () => {
    if (!canSubmit) return;
    setNewItem(prev => ({
      ...prev,
      images: capturedPhotos,
      edits: imageEdits,
    }));
    setStartAnalyze(true);
    console.log('Submitting photos:', capturedPhotos);
  };

  const acceptAiOutputHandler = data => {
    const updatedItem = {
      ...newItem,
      images: capturedPhotos,
      edits: imageEdits,
      title: data.title,
      category: data.category,
      description: data.description,
    };

    setNewItem(updatedItem);
    navigation.navigate('DetailsForm', { item: updatedItem });
  };
  const rejectAiOutputHandler = () => {
    const updatedItem = {
      ...newItem,
      images: capturedPhotos,
      edits: imageEdits,
    };

    setNewItem(updatedItem);
    navigation.navigate('DetailsForm', { item: updatedItem });
  };
  if (!hasPermission || !device) {
    return (
      <View style={styles.center}>
        <Text>Camera not available</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocused}
        photo={true}
        // frameProcessor={frameProcessor}
        // pixelFormat="yuv"
      />

      <View style={styles.topOverlay}>
        <Text style={styles.counter}>
          {capturedPhotos.length} / {MAX_PHOTOS} photos
        </Text>
      </View>

      <View style={styles.bottomOverlay}>
        <ThubnailStack
          photos={capturedPhotos}
          edits={imageEdits}
          onEditChange={onEditChange}
        />

        <View style={styles.captureWrapper}>
          {canTakePhoto && <CameraButton onPress={takePhoto} />}
        </View>

        <ImagePicker
          onPick={newPhotos => {
            setCapturedPhotos(prev => [...prev, ...newPhotos]);
            setImageEdits(prev => [...prev, []]);
          }}
          maxPhotos={MAX_PHOTOS}
          currentCount={capturedPhotos.length}
        />

        <View style={styles.submitWrapper}>
          <Button
            disabled={!canSubmit}
            onPress={submitIssueHandler}
            title={`Next (${capturedPhotos.length}/${MIN_PHOTOS})`}
            style={styles.submitButton}
          />
        </View>
        {startAnalyze && (
          <AiOutputModal
            images={capturedPhotos}
            visible={startAnalyze}
            onReject={rejectAiOutputHandler}
            onAccept={acceptAiOutputHandler}
          />
        )}
      </View>
    </View>
  );
};

export default CreateIssueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topOverlay: {
    position: 'absolute',
    top: 40,
    width: '100%',
    alignItems: 'center',
  },

  counter: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  bottomOverlay: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },

  captureWrapper: {
    marginBottom: 16,
  },

  submitWrapper: {
    width: '100%',
    alignItems: 'center',
  },

  submitButton: {
    width: '80%',
  },
});
