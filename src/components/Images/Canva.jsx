import React, { useEffect } from 'react';
import {
  Canvas,
  Image,
  useImage,
  Skia,
  Path,
} from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useSharedValue, runOnJS } from 'react-native-reanimated';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useState } from 'react';
const { width, height } = Dimensions.get('window');

const Canva = ({ image: imageUri, isEditing }) => {
  const [paths, setPaths] = useState([]);

  const path = useSharedValue(Skia.Path.Make());
  const addPath = finishedPath => {
    setPaths(prev => [...prev, finishedPath]);
  };
  const panGesture = Gesture.Pan()
    .enabled(isEditing)
    .onBegin(event => {
      const newPath = Skia.Path.Make();
      newPath.moveTo(event.x, event.y);
      path.value = newPath;
    })
    .onUpdate(event => {
      const newPath = path.value.copy();
      newPath.lineTo(event.x, event.y);
      path.value = newPath;
    })
    .onEnd(() => {
      runOnJS(addPath)(path.value);
      path.value = Skia.Path.Make();
    });

  const image = useImage(imageUri);

  useEffect(() => {
    console.log('Image decoded:', !!image);
  }, [imageUri, image]);

  if (!image) {
    return <LoadingSpinner visible={true} message={'decoding image...'} />;
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Canvas style={{ width, height }}>
        <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={height}
          fit="contain"
        />
        {paths.map((p, index) => (
          <Path
            key={index}
            path={p}
            color="cyan"
            style="stroke"
            strokeWidth={4}
          />
        ))}
        {path && (
          <Path path={path} color="cyan" style="stroke" strokeWidth={4} />
        )}
      </Canvas>
    </GestureDetector>
  );
};

export default Canva;
