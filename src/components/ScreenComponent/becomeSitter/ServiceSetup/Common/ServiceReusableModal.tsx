import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import ModalBottomView from '../../../../UI/modal/ModalBottomView';
import HeaderText from '../../../../common/text/HeaderText';
import Divider from '../../../../UI/Divider';
import DescriptionText from '../../../../common/text/DescriptionText';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
import IOSButton from '../../../../UI/IOSButton';
import Colors from '../../../../../constants/Colors';
import BottomSpacing from '../../../../UI/BottomSpacing';

interface Props {
  modalVisible: boolean;
  setModalVisible: (arg1: boolean) => void;
  question?: string;
  description?: string;
}
const ServiceReusableModal = ({
  modalVisible,
  setModalVisible,
  question,
  description,
}: Props) => {
  return (
    <View>
      <ModalBottomView
        isModalVisible={modalVisible}
        setIsModalVisible={setModalVisible}>
        <HeaderText text={question} />
        <Divider />
        <ScrollView showsVerticalScrollIndicator={false}>
          <DescriptionText text={description} />
          <IOSButton
            title={'Close'}
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={styles.titleStyle}
            onSelect={() => setModalVisible(false)}
          />
          <BottomSpacing />
        </ScrollView>
      </ModalBottomView>
    </View>
  );
};

export default ServiceReusableModal;

const styles = StyleSheet.create({
  titleStyle: {
    color: Colors.alert,
    fontWeight: '600',
  },
});
