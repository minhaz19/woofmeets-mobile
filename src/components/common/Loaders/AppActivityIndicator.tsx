import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import Lottie from 'lottie-react-native';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const AppActivityIndicator = ({visible = false}) => {
  const {colors} = useTheme();
  if (!visible) {
    return null;
  }
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={visible}
      style={styles.modal}
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View
          style={[styles.overlay, {backgroundColor: colors.backgroundColor}]}>
          <Lottie
            autoPlay
            loop
            source={require('../../../assets/petLoader.json')}
            style={styles.loaderStyle}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {zIndex: 1100},
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,

    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  loaderStyle: {width: '50%'},
});

export default AppActivityIndicator;
