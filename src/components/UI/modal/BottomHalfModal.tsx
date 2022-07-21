import {View, Modal} from 'react-native';
import React from 'react';
import {designs} from '../../../constants/theme/common/modalEndStyles';
const BottomHalfModal = (props: {
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
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible}>
        <View style={designs.centeredViewBg}>
          <View style={designs.modalViewRounded}>
            <View>{props.children}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BottomHalfModal;
