import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CallIcon,
  CuponIcon,
  HelpIcon,
  InviteIcon,
  PaymentIcon,
  PreferenceIcon,
  ProfileIcon,
  SitterIcon,
} from '../../assets/svgs/Setting_SVG';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import TitleText from '../../components/common/text/TitleText';
import Colors from '../../constants/Colors';
import ShortText from '../../components/common/text/ShortText';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import SettingItem from '../../components/ScreenComponent/setting/SettingItem';
import {useAppDispatch, useAppSelector} from '../../store/store';
import jwtDecode from 'jwt-decode';
import authStorage from '../../utils/helpers/auth/storage';
import BottomSpacing from '../../components/UI/BottomSpacing';
import {logout} from '../../store/slices/auth/userSlice';
import methods from '../../api/methods';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingMain = (props: {
  navigation: {navigate: (arg0: string) => any};
}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const [token, setToken] = useState<any>();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  // const userInfo = useAppSelector(state => state.auth.userInfo);

  const getDecodedToken = async () => {
    const tok: any = await authStorage.getToken();
    if (tok) {
      const decode: any = await jwtDecode(tok);
      setToken(decode);
      return decode;
    }
  };
  useEffect(() => {
    getDecodedToken();
  }, []);

  const loginData = [
    {
      id: 3,
      title: 'Sign Up',
      icon: PreferenceIcon,
      screenName: () => props.navigation.navigate('SignUp'),
      rightIcon: true,
      opacity: 1,
      isGuest: true,
    },
  ];
  const profileData = [
    {
      id: 2,
      title: 'Payments and Payout',
      icon: PaymentIcon,
      screenName: () => props.navigation.navigate('ReceivePayments'),
      rightIcon: true,
      opacity: 1,
    },
    // {
    //   id: 3,
    //   title: 'Cards',
    //   icon: CardsIcon,
    //   screenName: () => props.navigation.navigate('CreditAndDebitCard'),
    //   rightIcon: true,
    //   opacity: 1,
    // },
  ];

  const customerProfile = {
    id: 1,
    title: 'My Account',
    icon: ProfileIcon,
    screenName: () => props.navigation.navigate('MyAccount'),
    rightIcon: true,
    opacity: 1,
  };

  const sitterProfile = {
    id: 4,
    title: 'Profile',
    icon: ProfileIcon,
    screenName: () => props.navigation.navigate('Profile'),
    rightIcon: true,
    opacity: 1,
  };

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

  const servicesData = [
    {
      id: 1,
      title: 'Book a service',
      icon: SitterIcon,
      screenName: () => props.navigation.navigate('ProHomeNavigator'),
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
  ];

  const preferenceData = [
    {
      id: 3,
      title: 'Preference',
      icon: PreferenceIcon,
      screenName: () => props.navigation.navigate('Preference'),
      rightIcon: true,
      opacity: 1,
      isGuest: true,
    },
    {
      id: 2,
      title: 'Logout',
      vectorIcon: (
        <MaterialCommunityIcons
          name="logout"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
          style={styles.iconStyle}
          color={Colors.primary}
        />
      ),
      screenName: () => {
        dispatch(logout());
        methods._get('/auth/logout');
        props.navigation.navigate('AuthNavigator');
      },
      opacity: 1,
    },
  ];

  const providerData = [
    {
      id: 1,
      title: 'Availability Calendar',
      icon: CallIcon,
      rightIcon: true,
      screenName: () => props.navigation.navigate('ProviderAvailablity'),
      opacity: 1,
    },
    {
      id: 2,
      title: 'Manage services',
      icon: HelpIcon,
      screenName: () => {},
      rightIcon: true,
      opacity: 1,
    },
    {
      id: 3,
      title: 'Promote your business',
      icon: HelpIcon,
      screenName: () => {},
      rightIcon: true,
      opacity: 1,
    },
  ];

  return (
    <ScrollView
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <View>
        <View style={styles.boxContainer}>
          <View style={styles.boxTextContainer}>
            <ShortText textStyle={{color: Colors.alter}} text={'Get $100'} />
            <ShortText text={' when friends join Woofmeets'} />
          </View>
          <ShortText text={'Share Now'} />
        </View>
        {!isLoggedIn && (
          <View>
            {loginData?.map(item => (
              <SettingItem data={item} key={item.id} />
            ))}
            <View
              style={[
                styles.divider,
                {backgroundColor: colors.descriptionText},
              ]}
            />
          </View>
        )}
        {isLoggedIn && (
          <View>
            <View style={styles.titleContainer}>
              <TitleText text="Account" />
            </View>
            {token && token.provider ? (
              <SettingItem data={sitterProfile} key={sitterProfile.id} />
            ) : (
              <SettingItem data={customerProfile} key={customerProfile.id} />
            )}
            {profileData?.map(item => (
              <SettingItem data={item} key={item.id} />
            ))}
            <View
              style={[
                styles.divider,
                {backgroundColor: colors.descriptionText},
              ]}
            />
          </View>
        )}
        {token && token.provider ? (
          <View>
            <View style={styles.titleContainer}>
              <TitleText text="Services" />
            </View>
            {servicesData?.map(item => (
              <SettingItem data={item} key={item.id} />
            ))}
          </View>
        ) : (
          <View>
            <View style={styles.titleContainer}>
              <TitleText text="Sitting" />
            </View>
            {sittingData?.map(item => (
              <SettingItem data={item} key={item.id} />
            ))}
          </View>
        )}

        {token && token.provider && (
          <View>
            <View
              style={[
                styles.divider,
                {backgroundColor: colors.descriptionText},
              ]}
            />
            <View style={styles.titleContainer}>
              <TitleText text="Sitting" />
            </View>
            {providerData?.map(item => (
              <SettingItem data={item} key={item.id} />
            ))}
          </View>
        )}

        <View
          style={[styles.divider, {backgroundColor: colors.descriptionText}]}
        />
        {isLoggedIn && (
          <View>
            <View style={styles.titleContainer}>
              <TitleText text="Refferals and Promos" />
            </View>
            {referralData?.map(item => (
              <SettingItem data={item} key={item.id} />
            ))}
            <View
              style={[
                styles.divider,
                {backgroundColor: colors.descriptionText},
              ]}
            />
          </View>
        )}
        <View style={styles.titleContainer}>
          <TitleText text="Support" />
        </View>
        {supportData?.map(item => (
          <SettingItem data={item} key={item.id} />
        ))}
        {isLoggedIn &&
          preferenceData?.map((item: any) => (
            <SettingItem data={item} key={item.id} />
          ))}
      </View>
      <BottomSpacing />
      <BottomSpacing />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '10%' : 0,
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
  iconStyle: {paddingRight: 0},
});

export default SettingMain;
