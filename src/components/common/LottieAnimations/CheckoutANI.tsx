import {StyleSheet} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const CheckoutANI = () => {
  return (
    <AnimatedLottieView
      autoPlay
      loop
      source={require('../../../assets/checkout.json')}
      style={styles.loaderStyle}
    />
  );
};

export default CheckoutANI;

const styles = StyleSheet.create({
  loaderStyle: {width: '50%', alignSelf: 'center'},
});
