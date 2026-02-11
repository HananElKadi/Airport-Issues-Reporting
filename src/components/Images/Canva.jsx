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
import {
  useSharedValue,
  runOnJS,
  useDerivedValue,
} from 'react-native-reanimated';
import LoadingSpinner from '../UI/LoadingSpinner';

const { width, height } = Dimensions.get('window');

const Canva = ({ image: imageUri, isEditing, paths = [], onNewPath }) => {
  const currentPathString = useSharedValue('');

  const animatedPath = useDerivedValue(() => {
    if (!currentPathString.value) return Skia.Path.Make();
    return Skia.Path.MakeFromSVGString(currentPathString.value);
  });

  const processedPaths = paths
    .map(svgString => Skia.Path.MakeFromSVGString(svgString))
    .filter(Boolean);

  const panGesture = Gesture.Pan()
    .enabled(isEditing)
    .onBegin(event => {
      currentPathString.value = `M ${event.x} ${event.y}`;
    })
    .onUpdate(event => {
      currentPathString.value += ` L ${event.x} ${event.y}`;
    })
    .onEnd(() => {
      if (onNewPath && currentPathString.value) {
        runOnJS(onNewPath)(currentPathString.value);
      }
      currentPathString.value = '';
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
        {processedPaths.map((p, index) => (
          <Path
            key={index}
            path={p}
            color="cyan"
            style="stroke"
            strokeWidth={4}
          />
        ))}
        <Path path={animatedPath} color="red" style="stroke" strokeWidth={4} />
      </Canvas>
    </GestureDetector>
  );
};

export default Canva;
