import {StyleSheet} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const DotLoader = () => {
  return (
    <AnimatedLottieView
      autoPlay
      loop
      source={require('../../../assets/loadingDotStatic.json')}
      style={styles.loaderStyle}
    />
  );
};

export default DotLoader;

const styles = StyleSheet.create({
  loaderStyle: {width: '30%'},
});
