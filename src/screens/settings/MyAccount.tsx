/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  CallIcon,
  CardsIcon,
  ChangePasswordIcon,
  Payment2Icon,
  PaymentIcon,
  PetsIcon,
  Profile2Icon,
  ProfileIcon,
} from '../../assets/svgs/Setting_SVG';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Colors from '../../constants/Colors';
import Text_Size from '../../constants/textScaling';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import SettingItem from '../../components/ScreenComponent/setting/SettingItem';
import ProfileInfo from '../../components/ScreenComponent/profile/BasicInfo/ProfileInfo';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getUserProfileInfo} from '../../store/slices/userProfile/userProfileAction';
import AppActivityIndicator from '../../components/common/Loaders/AppActivityIndicator';
import storage from '../../utils/helpers/auth/storage';
import ScreenRapperGrey from '../../components/common/ScreenRapperGrey';

const MyAccount = (props: {
  navigation: {navigate: (arg0: string, arg1?: any) => any};
}) => {
  const dispatch = useAppDispatch();
  const {loading, userInfo} = useAppSelector(state => state.userProfile);
  const [newData, setNewData] = useState<any>([]);

  const supportData = [
    {
      id: 1,
      title: 'Basic Info',
      icon: ProfileIcon,
      screenName: () => props.navigation.navigate('BasicInfo'),
      details: 'Name, Age, Photo, Address, Country',
      opacity: 1,
    },
    {
      id: 2,
      title: 'Contact',
      icon: CallIcon,
      screenName: () => props.navigation.navigate('ContactScreen'),
      details: 'Number, Email, Location',
      opacity: 1,
    },
    {
      id: 3,
      title: 'Change Password',
      icon: ChangePasswordIcon,
      screenName: () => props.navigation.navigate('ResetPassword'),
      details: 'Update and secure your password',
      opacity: 1,
    },
    {
      id: 4,
      title: 'Payment method',
      icon: PaymentIcon,
      screenName: () =>
        props.navigation.navigate('PaymentMethod', {sequence: null}),
      details: 'Add payment, Card',
      opacity: 1,
    },
    {
      id: 5,
      title: 'Current Plan',
      icon: Payment2Icon,
      screenName: () => props.navigation.navigate('SubscriptionScreen'),
      details: 'Current Subscribe Plan',
      opacity: 1,
    },
    {
      id: 6,
      title: 'Your Pets',
      icon: PetsIcon,
      screenName: () => props.navigation.navigate('PetScreens'),
      details: 'Edit, pet, add new pet',
      opacity: 1,
    },
  ];
  const {colors} = useTheme();
  const b = async () => {
    const login: any = await storage.getUser();

    if (login.loginProvider === 'LOCAL') {
      setNewData(supportData);
    } else if (login.loginProvider !== 'LOCAL') {
      supportData.splice(2, 1);
      setNewData(supportData);
    }
  };

  useEffect(() => {
    userInfo === null ? dispatch(getUserProfileInfo()) : false;
    b();
  }, []);
  return (
    <ScreenRapperGrey>
      {loading && <AppActivityIndicator visible={true} />}

      <ScrollView style={styles.rootContainer}>
        <SafeAreaView>
          <View style={styles.profileContainer}>
            <ProfileInfo />
          </View>

          {newData.map((item: any) => (
            <SettingItem
              data={item}
              key={item.id}
              descriptionStyle={{
                color: colors.lightText,
                fontSize: Text_Size.Text_8,
              }}
            />
          ))}
        </SafeAreaView>
      </ScrollView>
    </ScreenRapperGrey>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '10%' : 0,
  },
  profileContainer: {
    padding: 20,
    paddingLeft: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
  },
  titleContainer: {
    marginHorizontal:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
    marginBottom: '2%',
  },
  boxContainer: {
    marginHorizontal:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
    marginBottom: '2%',
    borderWidth: 1,
    borderColor: Colors.subText,
    padding: '2%',
  },
  boxTextContainer: {
    flexDirection: 'row',
    paddingBottom: '0.8%',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingLeft: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
  },
  imageContainer: {
    height: SCREEN_WIDTH <= 380 ? 44 : SCREEN_WIDTH <= 600 ? 60 : 68,
    width: SCREEN_WIDTH <= 380 ? 44 : SCREEN_WIDTH <= 600 ? 60 : 68,
    borderRadius: 50,
    borderWidth: 1,
  },
  nameContainer: {
    padding: 10,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: SCREEN_WIDTH <= 380 ? 44 : SCREEN_WIDTH <= 600 ? 60 : 68,
    width: SCREEN_WIDTH <= 380 ? 44 : SCREEN_WIDTH <= 600 ? 60 : 68,
    borderRadius: 50,
  },
});

export default MyAccount;
