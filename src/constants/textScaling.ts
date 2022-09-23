import { Dimensions, PixelRatio, Platform } from 'react-native';
import {SCREEN_WIDTH} from './WindowSize';

const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}


// SCREEN_WIDTH <= 380
// ? 9
// : SCREEN_WIDTH <= 600
// ? SCREEN_WIDTH * 0.030 <= 14
//   ? SCREEN_WIDTH * 0.032
//   : 13
// : 13,

const Text_Size_Type = {
  Scale: {
    Text_0: normalize(13),
    Text_1:
      normalize(14),
    Text_2:
      normalize(14),
    Text_3: normalize(17),
    Text_4:
      normalize(18),
    Text_5:
      SCREEN_WIDTH <= 380
        ? SCREEN_WIDTH * 0.045
        : SCREEN_WIDTH <= 600
        ? SCREEN_WIDTH * 0.065 <= 32
          ? SCREEN_WIDTH * 0.065
          : 38
        : 38,
    Text_6: SCREEN_WIDTH * 0.07,
    Text_7: SCREEN_WIDTH * 0.075,
    Text_8:
      normalize(11),
    Text_9:
      normalize(12),
  },
};

const Text_Size = Text_Size_Type.Scale;

export default Text_Size;
