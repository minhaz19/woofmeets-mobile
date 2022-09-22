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
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import { useTheme } from '../../../constants/theme/hooks/useTheme';

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
  const {colors} = useTheme();
  return (
    <TouchableWithoutFeedback
      onBlur={props.onBlur}
      onPress={() => props.setIsModalVisible(false)}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.isModalVisible}>
        <TouchableWithoutFeedback onPress={() => props.setIsModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {
              backgroundColor: colors.backgroundColor,
            }]}>{props.children}</View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  modalText: {
    color: 'black',
    fontSize: Text_Size.Text_1,
  },
  iconContainer: {padding: 10, justifyContent: 'center', alignItems: 'center'},
  iconView: {height: 80, width: 80, marginBottom: 10},
  modalView: {
    width: SCREEN_WIDTH > 800 ? '60%' : '90%',
    minHeight: '20%',
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
    // flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 10,
  },
});

export default MiddleModal;
