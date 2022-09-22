import {StyleSheet} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const BackgroundCheckANIalt = () => {
  return (
    <AnimatedLottieView
      autoPlay
      loop
      source={require('../../../assets/backgroundCheckTwo.json')}
      style={styles.loaderStyle}
    />
  );
};

export default BackgroundCheckANIalt;

const styles = StyleSheet.create({
  loaderStyle: {width: '50%', alignSelf: 'center'},
});
