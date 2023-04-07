import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import Lottie from 'lottie-react-native';
import Colors from '../../../constants/Colors';
interface Props {
  visible?: boolean;
}

const AppActivityIndicator = ({visible = false}: Props) => {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    setStatus(visible);
  }, [visible]);
  if (!status) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={status}
      style={styles.modal}>
      <View style={styles.overlay}>
        <View style={[styles.overlay, {backgroundColor: Colors.background}]}>
          <Lottie
            autoPlay
            loop
            source={require('../../../assets/NewPetLoader.json')}
            style={styles.loaderStyle}
          />
        </View>
      </View>
    </Modal>
  );
};

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

export default AppActivityIndicator;
