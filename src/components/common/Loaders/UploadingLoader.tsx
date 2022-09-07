import {StyleSheet} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const UploadingLoader = () => {
  return (
    <AnimatedLottieView
      autoPlay
      loop
      source={require('../../../assets/loader.json')}
      style={styles.loaderStyle}
    />
  );
};

export default UploadingLoader;

const styles = StyleSheet.create({
  loaderStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
});
