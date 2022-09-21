import {StyleSheet} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const SuccessANI = () => {
  return (
    <AnimatedLottieView
      autoPlay
      loop
      source={require('../../../assets/checkoutSuccess.json')}
      style={styles.loaderStyle}
    />
  );
};

export default SuccessANI;

const styles = StyleSheet.create({
  loaderStyle: {width: '10%', alignSelf: 'center'},
});
