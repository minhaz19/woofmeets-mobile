import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BigText from '../../../components/common/text/BigText';
import DescriptionText from '../../../components/common/text/DescriptionText';
import HeaderText from '../../../components/common/text/HeaderText';
import Divider from '../../../components/UI/Divider';
import {BriefCaseSvg, QuestionIcon} from '../../../assets/SVG_LOGOS';
import BetweenCom from '../../../components/ScreenComponent/becomeSitter/profile/BetweenCom';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import Colors from '../../../constants/Colors';

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
        props.navigation.navigate('PhoneNumberSitter');
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
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <BigText text="Complete the required steps to get approved" />
      <View style={styles.textContainer}>
        <View style={styles.iconContainer}>
          <QuestionIcon />
        </View>
        <DescriptionText
          text="How dose approval work?"
          textStyle={{color: colors.blueText}}
        />
      </View>
      <View>
        <HeaderText text="Service Setup" />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.iconContainer}>
          <QuestionIcon />
        </View>
        <DescriptionText
          text="Where are my other services?"
          textStyle={{color: colors.blueText}}
        />
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
        <TouchableOpacity onPress={item.screen} style={styles.profileItemStyle}>
          <DescriptionText
            text={item.text}
            textStyle={{color: colors.blueText}}
          />
        </TouchableOpacity>
      ))}
      {/* testimonial */}
      <Divider />
      <BetweenCom
        data={{
          name: 'Request Testimonials',
          description: 'Use reference to build trust new Potencial clients',
          time: '3 mins',
          icon: 'chevron-right',
        }}
      />
      {/* safety quiz */}
      <Divider />
      <BetweenCom
        data={{
          name: 'Pass a Safety Quiz',
          description: 'Safe stays lead to 5 star reviews',
          time: '3 mins',
          icon: 'chevron-right',
        }}
      />
      {/* final details */}
      <Divider />
      <BetweenCom
        data={{
          name: 'Final Details',
          description: 'Background check and processing fee',
          time: '3 mins',
          icon: 'chevron-right',
        }}
      />
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
  },
  textStyle: {
    paddingLeft: 5,
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
