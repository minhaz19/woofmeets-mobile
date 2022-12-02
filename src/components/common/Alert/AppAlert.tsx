/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Modal, Animated} from 'react-native';
import Text_Size from '../../../constants/textScaling';
import AppTouchableOpacity from '../AppClickEvents/AppTouchableOpacity';
import BigText from '../text/BigText';
interface Props {
  visible: boolean;
  children: any;
}
const ModalPoup = ({visible, children}: Props) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <AppTouchableOpacity
        style={styles.modalBackGround}
        onPress={() => setShowModal(false)}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </AppTouchableOpacity>
    </Modal>
  );
};

const AppAlert = ({visible}: any) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ModalPoup visible={visible}>
        <BigText
          text="Congratulations registration was successful"
          textStyle={{
            marginVertical: 30,
            fontSize: Text_Size.Text_5,
            textAlign: 'center',
          }}
        />
      </ModalPoup>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default AppAlert;
