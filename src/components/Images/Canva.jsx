import React from 'react';
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
import COLORS from '../../utils/constants';

const { width, height } = Dimensions.get('window');

const getContainedRect = (imgW, imgH, canvasW, canvasH) => {
  'worklet';
  const scale = Math.min(canvasW / imgW, canvasH / imgH);
  const renderW = imgW * scale;
  const renderH = imgH * scale;
  const x = (canvasW - renderW) / 2;
  const y = (canvasH - renderH) / 2;
  return { x, y, width: renderW, height: renderH };
};

const Canva = ({
  image: imageUri,
  isEditing,
  paths = [],
  onNewPath,
  dimension,
}) => {
  const currentPathString = useSharedValue('');
  const rectX = useSharedValue(0);
  const rectY = useSharedValue(0);
  const rectW = useSharedValue(0);
  const rectH = useSharedValue(0);

  const animatedPath = useDerivedValue(() => {
    if (!currentPathString.value) return Skia.Path.Make();
    return (
      Skia.Path.MakeFromSVGString(currentPathString.value) ?? Skia.Path.Make()
    );
  });

  const processedPaths = paths
    .map(svgString => Skia.Path.MakeFromSVGString(svgString))
    .filter(Boolean);

  const panGesture = Gesture.Pan()
    .enabled(isEditing)
    .onBegin(event => {
      const rect = getContainedRect(
        dimension.width,
        dimension.height,
        width,
        height,
      );
      rectX.value = rect.x;
      rectY.value = rect.y;
      rectW.value = rect.width;
      rectH.value = rect.height;

      if (
        event.x < rect.x ||
        event.x > rect.x + rect.width ||
        event.y < rect.y ||
        event.y > rect.y + rect.height
      ) {
        return;
      }

      currentPathString.value = `M ${event.x} ${event.y}`;
    })
    .onUpdate(event => {
      if (!currentPathString.value) return;

      const clamped = {
        x: Math.min(Math.max(event.x, rectX.value), rectX.value + rectW.value),
        y: Math.min(Math.max(event.y, rectY.value), rectY.value + rectH.value),
      };

      currentPathString.value += ` L ${clamped.x} ${clamped.y}`;
    })
    .onEnd(() => {
      if (currentPathString.value && onNewPath) {
        runOnJS(onNewPath)(currentPathString.value);
      }
      currentPathString.value = '';
    });

  const image = useImage(imageUri);

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
            color={COLORS.textInverse}
            style="stroke"
            strokeWidth={5}
          />
        ))}
        <Path
          path={animatedPath}
          color={COLORS.textInverse}
          style="stroke"
          strokeWidth={5}
        />
      </Canvas>
    </GestureDetector>
  );
};

export default Canva;
