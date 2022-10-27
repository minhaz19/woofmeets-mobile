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
const ServiceReusableModal = ({modalVisible, setModalVisible, question, description}: Props) => {
  const modalData = [
    {
      id: 1,
      title: 'How does approval work?',
      text: "Woofmeets selects a single service for you to complete during sign up. Once approved, youy can deactivate any services you no longer wish to offer or add additional service at any time. \n\nOnce you've completed the required sign - up steps , your profile will be auto- submitted and reviewed to ensure accuracy and quality. agna aliquyam erat, sed diam voluptua. \n\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. \n\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    },
    {
      id: 2,
      title: 'How does approval work?',
      text: "Woofmeets selects a single service for you to complete during sign up. Once approved, youy can deactivate any services you no longer wish to offer or add additional service at any time. \n\nOnce you've completed the required sign - up steps , your profile will be auto- submitted and reviewed to ensure accuracy and quality. agna aliquyam erat, sed diam voluptua. \n\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. \n\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    },
  ];
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
