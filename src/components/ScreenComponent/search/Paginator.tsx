import {StyleSheet, View, Animated} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';

interface Props {
  data: any;
  scrollX: any;
}

const Paginator = ({data, scrollX}: Props) => {
  return (
    <View style={styles.container}>
      {data.map((item: any, i: number) => {
        const inputRange = [
          (i - 1) * SCREEN_WIDTH,
          i * SCREEN_WIDTH,
          (i + 1) * SCREEN_WIDTH,
        ];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={item.id}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginHorizontal: 8,
  },
});
