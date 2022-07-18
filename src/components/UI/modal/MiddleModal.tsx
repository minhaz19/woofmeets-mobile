import {
  View,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  NativeSyntheticEvent,
  TargetedEvent,
} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';

const MiddleModal = (props: {
  onBlur: ((e: NativeSyntheticEvent<TargetedEvent>) => void) | undefined;
  setIsModalVisible: (arg0: boolean) => void;
  isModalVisible: boolean | undefined;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <TouchableWithoutFeedback
      onBlur={props.onBlur}
      onPress={() => props.setIsModalVisible(false)}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible}>
        <TouchableWithoutFeedback
          onPress={() => props.setIsModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>{props.children}</View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  //Modal
  centeredView: {
    flex: 1,
    width: '100%',
    marginLeft: '5%',
    justifyContent: 'center',
  },
  modalText: {
    color: 'black',
    fontSize: Text_Size.Text_1,
  },
  iconContainer: {padding: 10, justifyContent: 'center', alignItems: 'center'},
  iconView: {height: 80, width: 80, marginBottom: 10},
  modalView: {
    width: '90%',
    height: '20%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 9,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
});

export default MiddleModal;
