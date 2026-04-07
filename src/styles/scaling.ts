import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * horizontalScale
 * Use for width, paddingHorizontal, marginHorizontal, left, right, etc.
 */
export const horizontalScale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

/**
 * verticalScale
 * Use for height, paddingVertical, marginVertical, top, bottom, etc.
 */
export const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

/**
 * moderateScale
 * Use for font-size, borderRadius, etc.
 */
export const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

/**
 * widthPercentage
 * Use for percentage based width
 */
export const widthPercentage = (percent: number) => {
  const screenWidth = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel((screenWidth * percent) / 100);
};

/**
 * heightPercentage
 * Use for percentage based height
 */
export const heightPercentage = (percent: number) => {
  const screenHeight = Dimensions.get('window').height;
  return PixelRatio.roundToNearestPixel((screenHeight * percent) / 100);
};
