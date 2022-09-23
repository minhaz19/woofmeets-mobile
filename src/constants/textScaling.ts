import {Dimensions, PixelRatio, Platform} from 'react-native';
import {SCREEN_WIDTH} from './WindowSize';
const scale = SCREEN_WIDTH / 280;
export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 0;
  }
}
const Text_Size_Type = {
  Scale: {
    Text_0: normalize(13),
    Text_1: normalize(14),
    Text_2: normalize(14),
    Text_3: normalize(16),
    Text_4: normalize(17),
    Text_5: normalize(18),
    Text_6: normalize(20),
    Text_7: normalize(22),
    Text_8: normalize(11),
    Text_9: normalize(12),
  },
};
const Text_Size = Text_Size_Type.Scale;
export default Text_Size;
