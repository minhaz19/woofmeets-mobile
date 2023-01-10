/* eslint-disable react-native/no-inline-styles */
import {StyleSheet} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
interface Props {
  width?: string;
}
const DotLoader = ({width}: Props) => {
  return (
    <AnimatedLottieView
      autoPlay
      loop
      source={require('../../../assets/loadingDotStatic.json')}
      style={{
        width: width ? width : '30%',
      }}
    />
  );
};

export default DotLoader;

const styles = StyleSheet.create({});
