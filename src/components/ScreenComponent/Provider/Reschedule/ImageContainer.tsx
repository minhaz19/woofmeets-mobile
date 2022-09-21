/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants/WindowSize';
interface Props {
  image: string;
  rounded?: Boolean;
}
const ImageContainer = ({image, rounded}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          height: rounded
            ? SCREEN_WIDTH > 800
              ? SCREEN_WIDTH / 8
              : SCREEN_WIDTH / 6
            : SCREEN_HEIGHT / 9,
        },
      ]}>
      <Image
        source={{uri: image}}
        resizeMode="cover"
        style={[styles.image, {borderRadius: rounded ? 100 : 50}]}
      />
    </View>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH > 800 ? SCREEN_WIDTH / 10 : SCREEN_WIDTH / 6,
  },
  image: {width: '100%', height: '100%'},
});
