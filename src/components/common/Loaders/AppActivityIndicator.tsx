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
        source={require('../../../assets/loader.json')}
        style={styles.loaderStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.6,
    flex: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderStyle: {width: '50%'},
});

export default AppActivityIndicator;
