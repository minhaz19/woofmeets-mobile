import {useRef} from 'react';
import Animated, {useSharedValue} from 'react-native-reanimated';

const {useCode, call} = Animated;
export const useCodeCom = (
  minValue: number,
  maxValue: number,
  onChangeMin: (arg: number) => void,
  onChangeMax: (arg: number) => void,
  x1: any,
  x2: any,
  MAX_WIDTH: number,
) => {
  const min = useRef(null);
  const max = useRef(null);
  const offset = useSharedValue(0);
  useCode(
    () => [
      call([x1], ([value]) => {
        if (min.current) {
          onChangeMin(minValue + (value / MAX_WIDTH) * (maxValue - minValue));
          // offset.value = value;
          //@ts-ignore
          min.current.setNativeProps({
            text: `$${Math.round(
              minValue + (value / MAX_WIDTH) * (maxValue - minValue),
            )}`,
          });
        }
      }),
    ],
    [x1],
  );
  useCode(
    () => [
      call([x2], ([value]) => {
        if (max.current) {
          onChangeMax(minValue + (value / MAX_WIDTH) * (maxValue - minValue));
          // offset.value = value;
          //@ts-ignore
          max.current.setNativeProps({
            text: `$${Math.round(
              minValue + (value / MAX_WIDTH) * (maxValue - minValue),
            )}`,
          });
        }
      }),
    ],
    [x2],
  );
  return {offset, min, max};
};
