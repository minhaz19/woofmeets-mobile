import {View, Modal, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {designs} from '../../../constants/theme/common/modalEndStyles';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {useDispatch} from 'react-redux';
import {setOpenFilter} from '../../../store/slices/openFilter';
const BottomHalfModal = (props: {
  setIsModalVisible?: (arg0: boolean) => void;
  isModalVisible?: boolean | undefined;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback onPress={() => dispatch(setOpenFilter(false))}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible}>
        <TouchableWithoutFeedback
          onPress={() => dispatch(setOpenFilter(false))}>
          <View style={designs.centeredViewBg}>
            <View
              style={[
                designs.modalViewRounded,
                {backgroundColor: colors.backgroundColor},
              ]}>
              <View>{props.children}</View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default BottomHalfModal;
