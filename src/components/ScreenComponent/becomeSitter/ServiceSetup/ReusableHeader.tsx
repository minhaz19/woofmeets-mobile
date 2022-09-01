import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ModalBottomView from '../../../UI/modal/ModalBottomView';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import Divider from '../../../UI/Divider';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import {BoardingIcon} from '../../../../assets/svgs/Services_SVG';
import IOSButton from '../../../UI/IOSButton';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {QuestionIcon} from '../../../../assets/svgs/SVG_LOGOS';
import Colors from '../../../../constants/Colors';

const ReusableHeader = () => {
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const modalData = [
    {
      id: 1,
      title: 'How does approval work?',
      text: `Woofmeets selects a single service for you to complete during sign up. Once approved, youy can deactivate any services you no longer wish to offer or add additional service at any time. \n\nOnce you've completed the required sign - up steps , your profile will be auto- submitted and reviewed to ensure accuracy and quality. agna aliquyam erat, sed diam voluptua. \n\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. \n\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.`,
    },
    {
      id: 2,
      title: 'How does approval work?',
      text: `Woofmeets selects a single service for you to complete during sign up. Once approved, youy can deactivate any services you no longer wish to offer or add additional service at any time. \n\nOnce you've completed the required sign - up steps , your profile will be auto- submitted and reviewed to ensure accuracy and quality. agna aliquyam erat, sed diam voluptua. \n\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. \n\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.`,
    },
  ];
  return (
    <View style={styles.container}>
      <ModalBottomView
        isModalVisible={modalVisible}
        setIsModalVisible={setModalVisible}>
        <HeaderText text={modalData[0].title} />
        <Divider />
        <DescriptionText text={modalData[0].text} />
        <IOSButton
          title={'Close'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={styles.titleStyle}
          onSelect={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </ModalBottomView>
      <View style={styles.serviceDetailsContainer}>
        <BoardingIcon width={50} height={50} />
        <View style={styles.serviceDetails}>
          <HeaderText text={'Boarding'} textStyle={styles.headerText} />
          <DescriptionText
            text="Overnight pet care in your clients home"
            textStyle={{color: colors.descriptionText}}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.iconContainer}>
          <QuestionIcon fill={Colors.primary} />
        </View>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <DescriptionText
            text="Need help with rates"
            textStyle={{color: Colors.primary}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReusableHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  serviceDetailsContainer: {
    flexDirection: 'row',
  },
  serviceDetails: {
    marginLeft: 6,
    paddingTop: 10,
  },
  headerText: {
    paddingEnd: 6,
  },
  titleStyle: {
    color: Colors.alert,
    fontWeight: '600',
  },
  iconContainer: {
    paddingRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
});
