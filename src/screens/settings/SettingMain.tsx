import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {
  CallIcon,
  CardsIcon,
  CuponIcon,
  HelpIcon,
  InviteIcon,
  PaymentIcon,
  PreferenceIcon,
  ProfileIcon,
  SitterIcon,
} from '../../assets/svgs/Setting_SVG';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import HeaderText from '../../components/common/text/HeaderText';
import TitleText from '../../components/common/text/TitleText';
import Colors from '../../constants/Colors';
import ShortText from '../../components/common/text/ShortText';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import SettingItem from '../../components/ScreenComponent/setting/SettingItem';
import BottomSpacingNav from '../../components/UI/BottomSpacingNav';

const SettingMain = (props: {
  navigation: {navigate: (arg0: string) => any};
}) => {
  const {colors} = useTheme();
  const profileData = [
    {
      id: 1,
      title: 'My Account',
      icon: ProfileIcon,
      screenName: () => props.navigation.navigate('MyAccount'),
      rightIcon: true,
      opacity: 1,
    },
    {
      id: 2,
      title: 'Payments and Payout',
      icon: PaymentIcon,
      screenName: () => props.navigation.navigate('ReceivePayments'),
      rightIcon: true,
      opacity: 1,
    },
    {
      id: 3,
      title: 'Cards',
      icon: CardsIcon,
      screenName: () => {},
      rightIcon: true,
      opacity: 1,
    },
  ];

  const sittingData = [
    {
      id: 1,
      title: 'Become a sitter',
      icon: SitterIcon,
      screenName: () => props.navigation.navigate('SitterInitialScreen'),
      rightIcon: true,
      opacity: 1,
    },
  ];

  const referralData = [
    {
      id: 1,
      title: 'Invite a friend',
      icon: InviteIcon,
      screenName: () => props.navigation.navigate('InviteFriends'),
      details: 'Earn $20 when they book',
      rightIcon: true,
      opacity: 1,
    },
    {
      id: 2,
      title: 'Apply promo codes',
      icon: CuponIcon,
      screenName: () => props.navigation.navigate('PromoGiftCodes'),
      rightIcon: true,
      opacity: 1,
    },
  ];

  const supportData = [
    {
      id: 1,
      title: 'Emergency hotline',
      icon: CallIcon,
      screenName: () => {},
      opacity: 1,
    },
    {
      id: 2,
      title: 'Help',
      icon: HelpIcon,
      screenName: () => {},
      rightIcon: true,
      opacity: 1,
    },
    {
      id: 3,
      title: 'Preference',
      icon: PreferenceIcon,
      screenName: () => props.navigation.navigate('Preference'),
      rightIcon: true,
      opacity: 1,
    },
  ];

  return (
    <ScrollView style={[
      styles.rootContainer,
      {
        backgroundColor: colors.backgroundColor,
      },
    ]}>
      <View>
        <View style={[styles.titleContainer, styles.paddingTop]}>
          <HeaderText text="More" />
        </View>

        <View style={styles.boxContainer}>
          <View style={styles.boxTextContainer}>
            <ShortText textStyle={{color: Colors.alter}} text={'Get $20'} />
            <ShortText text={' when friends join Woofmeets'} />
          </View>
          <ShortText text={'Share Now'} />
        </View>

        {profileData?.map(item => (
          <SettingItem data={item} key={item.id} />
        ))}
        <View
          style={[styles.divider, {backgroundColor: colors.descriptionText}]}
        />
        <View style={styles.titleContainer}>
          <TitleText text="Sitting" />
        </View>
        {sittingData?.map(item => (
          <SettingItem data={item} key={item.id} />
        ))}
        <View
          style={[styles.divider, {backgroundColor: colors.descriptionText}]}
        />
        <View style={styles.titleContainer}>
          <TitleText text="Refferals and Promos" />
        </View>
        {referralData?.map(item => (
          <SettingItem data={item} key={item.id} />
        ))}
        <View
          style={[styles.divider, {backgroundColor: colors.descriptionText}]}
        />
        <View style={styles.titleContainer}>
          <TitleText text="Support" />
        </View>
        {supportData?.map(item => (
          <SettingItem data={item} key={item.id} />
        ))}
      </View>
      <BottomSpacingNav />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  paddingTop: {paddingTop: '2%'},
  divider: {
    height: 1,
    opacity: 0.3,
    marginLeft: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
    marginRight:
      SCREEN_WIDTH <= 380 ? '7%' : SCREEN_WIDTH <= 600 ? '8%' : '10%',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '2%',
  },
  titleContainer: {
    marginHorizontal:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
    marginBottom: '2%',
  },
  boxContainer: {
    marginHorizontal:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '3%' : '0%',
    borderWidth: 1,
    borderColor: Colors.subText,
    padding: '2%',
  },
  boxTextContainer: {
    flexDirection: 'row',
    paddingBottom: '0.8%',
  },
});

export default SettingMain;
