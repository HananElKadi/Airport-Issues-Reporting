import React from 'react';
import {
  Canvas,
  Image,
  useImage,
  Path,
  Skia,
} from '@shopify/react-native-skia';
import { View, ActivityIndicator, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ImageWithEditsPreview = ({ imageUri, paths = [], style }) => {
  const image = useImage(imageUri);

  const canvasWidth = style?.width || SCREEN_WIDTH;
  const canvasHeight = style?.height || 220;

  if (!image) {
    return (
      <View
        style={[
          style,
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          },
        ]}
      >
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  // Calculate scale factors
  const scaleX = canvasWidth / SCREEN_WIDTH;
  const scaleY = canvasHeight / SCREEN_HEIGHT;

  return (
    <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
      <Image
        image={image}
        x={0}
        y={0}
        width={canvasWidth}
        height={canvasHeight}
        fit="cover"
      />
      {Array.isArray(paths) &&
        paths.map((svgString, index) => {
          if (!svgString) return null;

          // Convert SVG string to Skia Path
          const path = Skia.Path.MakeFromSVGString(svgString);
          if (!path) return null;

          // Create scaled path using proper 3x3 matrix
          const scaledPath = path.copy();
          scaledPath.transform([
            scaleX,
            0,
            0, // row 1: scaleX, skewY, transX
            0,
            scaleY,
            0, // row 2: skewX, scaleY, transY
            0,
            0,
            1, // row 3: persp0, persp1, persp2
          ]);

          return (
            <Path
              key={index}
              path={scaledPath}
              color="cyan"
              style="stroke"
              strokeWidth={2}
            />
          );
        })}
    </Canvas>
  );
};

export default ImageWithEditsPreview;
