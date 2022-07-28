import {useMemo, useRef} from 'react';
import Animated from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
const {Value, event, set, block, cond, add, lessThan, greaterThan, eq} =
  Animated;
export const usePanGesture = (initalValue: number, MAX_WIDTH: number) => {
  const transx = useRef(new Value(initalValue)).current;
  const offsetX = useRef(new Value(initalValue)).current;
  const onGestureHandle = useMemo(() => {
    return event([
      {
        nativeEvent: ({translationX: x, state}: any) =>
          block([
            cond(lessThan(add(offsetX, x), 0), set(transx, 0), [
              cond(
                greaterThan(add(offsetX, x), MAX_WIDTH),
                set(transx, MAX_WIDTH),
                set(transx, add(offsetX, x)),
              ),
            ]),
            cond(eq(state, State.END), [set(offsetX, add(offsetX, x))]),
          ]),
      },
    ]);
  }, [transx, offsetX, MAX_WIDTH]);
  return {transx, onGestureHandle};
};
