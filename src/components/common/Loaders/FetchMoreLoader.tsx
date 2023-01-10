/* eslint-disable react-native/no-inline-styles */
import {StyleSheet} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
interface Props {
  width?: string;
}
const FetchMoreLoader = ({width}: Props) => {
  return (
    <AnimatedLottieView
      autoPlay
      loop
      source={require('../../../assets/fetchmore.json')}
      style={{
        width: width ? width : '30%',
      }}
    />
  );
};

export default FetchMoreLoader;

const styles = StyleSheet.create({});
