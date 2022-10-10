import {View, Modal, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import React from 'react';
import {designs} from '../../../constants/theme/common/modalEndStyles';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {setOpenFilter} from '../../../store/slices/misc/openFilter';
import {useAppDispatch} from '../../../store/store';
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
  const dispatch = useAppDispatch();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.setIsModalVisible
          ? props.setIsModalVisible(false)
          : dispatch(setOpenFilter(false));
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible}>
        <View style={designs.centeredViewBg}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.setIsModalVisible
                ? props.setIsModalVisible(false)
                : dispatch(setOpenFilter(false));
            }}>
            <View style={styles.close} />
          </TouchableWithoutFeedback>
          <View
            style={[
              designs.modalViewRounded,
              {backgroundColor: colors.backgroundColor},
            ]}>
            <View>{props.children}</View>
          </View>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default BottomHalfModal;
const styles = StyleSheet.create({
  close: {
    width: '100%',
    flex: 1,
    backgroundColor: 'transparent',
  },
});
