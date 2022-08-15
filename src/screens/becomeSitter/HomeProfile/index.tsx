import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BigText from '../../../components/common/text/BigText';
import DescriptionText from '../../../components/common/text/DescriptionText';
import HeaderText from '../../../components/common/text/HeaderText';
import Divider from '../../../components/UI/Divider';
import {BriefCaseSvg, QuestionIcon} from '../../../assets/svgs/SVG_LOGOS';
import BetweenCom from '../../../components/ScreenComponent/becomeSitter/profile/BetweenCom';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import Colors from '../../../constants/Colors';
import TitleText from '../../../components/common/text/TitleText';
import ModalBottomView from '../../../components/UI/modal/ModalBottomView';
import IOSButton from '../../../components/UI/IOSButton';

const HomeProfile = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const {colors} = useTheme();
  const profileData = [
    {
      id: 1,
      text: 'Basic Info',
      screen: () => {
        props.navigation.navigate('BasicInfoSitter');
      },
    },
    {
      id: 2,
      text: 'Phone Number',
      screen: () => {
        props.navigation.navigate('PhoneNumberSitter');
      },
    },
    {
      id: 3,
      text: 'Details',
      screen: () => {
        props.navigation.navigate('PhoneNumberSitter');
      },
    },
    {
      id: 4,
      text: 'Photos',
      screen: () => {
        props.navigation.navigate('GallerySitter');
      },
    },
    {
      id: 5,
      text: 'Your pets',
      screen: () => {
        props.navigation.navigate('PhoneNumberSitter');
      },
    },
  ];
  const titleListingData = [
    {
      id: 1,
      name: 'Request Testimonials',
      description: 'Use reference to build trust new Potencial clients',
      time: '3 mins',
      icon: 'chevron-right',
      screen: () => {
        props.navigation.navigate('BasicInfoSitter');
      },
    },
    {
      id: 2,
      name: 'Pass a Safety Quiz',
      description: 'Safe stays lead to 5 star reviews',
      time: '3 mins',
      icon: 'chevron-right',
      screen: () => {
        props.navigation.navigate('BasicInfoSitter');
      },
    },
    {
      id: 3,
      name: 'Final Details',
      description: 'Background check and processing fee',
      time: '3 mins',
      icon: 'chevron-right',
      screen: () => {
        props.navigation.navigate('BasicInfoSitter');
      },
    },
  ];
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isServiceModalVisible, setIsServiceModalVisible] =
    useState<boolean>(false);

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
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
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
      <ModalBottomView
        isModalVisible={isServiceModalVisible}
        setIsModalVisible={setIsServiceModalVisible}>
        <HeaderText text={modalData[0].title} />
        <Divider />
        <DescriptionText text={modalData[0].text} />
        <IOSButton
          title={'Close'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={styles.titleStyle}
          onSelect={() => {
            setIsServiceModalVisible(!isServiceModalVisible);
          }}
        />
      </ModalBottomView>
      <BigText text="Complete the required steps to get approved" />
      <View style={styles.textContainer}>
        <View style={styles.iconContainer}>
          <QuestionIcon fill={Colors.primary} />
        </View>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <DescriptionText
            text="How dose approval work?"
            textStyle={{color: colors.blueText}}
          />
        </TouchableOpacity>
      </View>
      <View>
        <HeaderText text="Service Setup" />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.iconContainer}>
          <QuestionIcon fill={Colors.primary} />
        </View>
        <TouchableOpacity
          onPress={() => setIsServiceModalVisible(!isServiceModalVisible)}>
          <DescriptionText
            text="Where are my other services?"
            textStyle={{color: colors.blueText}}
          />
        </TouchableOpacity>
      </View>
      {/* Boarding */}
      <Divider />
      <BetweenCom
        data={{
          name: 'Boarding',
          image: <BriefCaseSvg />,
          description: 'Set your service preferences',
          time: '3 mins',
          icon: 'chevron-right',
          screen: () => {
            props.navigation.navigate('BasicInfoSitter');
          },
        }}
      />
      {/* trust */}
      <Divider />
      <HeaderText text="Build Trust" />
      {/* create profile */}
      <Divider />
      <BetweenCom
        data={{
          name: 'Create Your Profile',
          description: 'Make a great first impression',
          time: '12 mins',
          icon: 'chevron-down',
        }}
      />
      {profileData.map(item => (
        <TouchableOpacity
          onPress={item.screen}
          style={styles.profileItemStyle}
          key={item.id}>
          <TitleText text={item.text} textStyle={{color: colors.blueText}} />
        </TouchableOpacity>
      ))}
      {/* testimonial, safety quiz, final Details */}
      {titleListingData?.map(item => (
        <View key={item.id}>
          <Divider />
          <BetweenCom data={item} />
        </View>
      ))}
      <Divider />
      {/* submit */}
      <View style={styles.footerContainer}>
        <ButtonCom
          title={'Submit'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
      </View>
      <View style={styles.footerText}>
        <HeaderText
          text="I no longer want to provide services on Woofmeets"
          textStyle={{color: Colors.primary, textAlign: 'center'}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  textStyle: {
    paddingLeft: 5,
  },
  titleStyle: {
    color: Colors.alert,
    fontWeight: '600',
  },
  iconContainer: {
    paddingRight: 10,
  },
  footerContainer: {
    paddingVertical: 20,
  },
  footerText: {
    paddingHorizontal: '10%',
    marginBottom: 60,
  },
  profileItemStyle: {
    paddingTop: 15,
  },
});

export default HomeProfile;
