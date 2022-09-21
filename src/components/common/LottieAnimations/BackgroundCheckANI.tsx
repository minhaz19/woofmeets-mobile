import {StyleSheet} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const BackgroundCheckANI = () => {
  return (
    <AnimatedLottieView
      autoPlay
      loop
      source={require('../../../assets/backgroundCheckOne.json')}
      style={styles.loaderStyle}
    />
  );
};

export default BackgroundCheckANI;

const styles = StyleSheet.create({
  loaderStyle: {width: '50%', alignSelf: 'center'},
});
