import {StyleSheet,  View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import Colors from '../../../constants/Colors';

const LoaderLite = () => {
  return (
    <View style={[styles.overlay, {backgroundColor: Colors.background}]}>
      <AnimatedLottieView
        autoPlay
        loop
        source={require('../../../assets/NewPetLoader.json')}
        style={styles.loaderStyle}
      />
    </View>
  );
};

export default LoaderLite;

const styles = StyleSheet.create({
  modal: {flex: 1},
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,

    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    zIndex: 9999,
  },
  loaderStyle: {width: '30%'},
});
