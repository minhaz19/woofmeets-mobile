import {View, Modal} from 'react-native';
import React from 'react';
import {designs} from '../../../constants/theme/common/modalEndStyles';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
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
  const {colors} = useTheme();
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible}>
        <View style={designs.centeredViewBg}>
          <View
            style={[
              designs.modalViewRounded,
              {backgroundColor: colors.backgroundColor},
            ]}>
            <View>{props.children}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BottomHalfModal;
