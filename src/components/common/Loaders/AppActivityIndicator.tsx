import React from 'react';
import {View, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const AppActivityIndicator = ({visible = false}) => {
  const {colors} = useTheme();
  if (!visible) {
    return null;
  }
  return (
    <View style={[styles.overlay, {backgroundColor: colors.backgroundColor}]}>
      <Lottie
        autoPlay
        loop
        source={require('../../../assets/petLoader.json')}
        style={styles.loaderStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderStyle: {width: '50%'},
});

export default AppActivityIndicator;
