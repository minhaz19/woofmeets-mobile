import {StyleSheet, ScrollView, Linking} from 'react-native';
import React, { useState } from 'react';
import PreferenceItem from '../../components/ScreenComponent/setting/Preference/PreferenceItem';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import HeaderText from '../../components/common/text/HeaderText';
import Text_Size from '../../constants/textScaling';
import ScreenRapperGrey from '../../components/common/ScreenRapperGrey';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getWhoAmI} from '../../store/slices/common/whoAmI/whoAmIAction';
import storage from '../../utils/helpers/auth/storage';
import { API_MSG } from '@env';
import apiClient from '../../api/client';
import VersionCheck from 'react-native-version-check';

const Preference = (props: {navigation: {navigate: (arg0: string) => any}}) => {
  const {fcmToken} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState(true);
  const supportData = [
    {
      id: 1,
      title: 'Account Setting',
      details: 'Find the account infos here',
      screenName: () => {
        props.navigation.navigate('AccountSetting');
        dispatch(getWhoAmI());
      },
      opacity: 1,
      switchButton: false,
    },
    {
      id: 2,
      title: 'Notifications',
      details: 'Enable or disable the notifications',
      opacity: 1,
      switchButton: true,
      changeNotificationSettings: async (val: boolean) => {
        const notificationEndPoint = '/v1/push-notifications';
        setToggle(val);
        const authToken = await storage.getToken();
        const result = await apiClient.put(`${API_MSG + notificationEndPoint}`, {registrationToken: fcmToken}, {headers: {'Authorization': authToken}});
      },
      switchValue: toggle,
    },
    {
      id: 3,
      title: 'Terms of Service',
      screenName: () =>
        Linking.openURL('https://woofmeets.com/terms-and-conditions'),
      details: 'https://woofmeets.com/terms-and-conditions',
      opacity: 1,
      switchButton: false,
    },
    {
      id: 4,
      title: 'Privacy Policy',
      screenName: () => Linking.openURL('https://woofmeets.com/privacy-policy'),
      details: 'https://woofmeets.com/privacy-policy',
      opacity: 1,
      switchButton: false,
    },
    {
      id: 5,
      title: 'Version',
      screenName: () => {},
      details: `${VersionCheck.getCurrentVersion()} - release`,
      opacity: 1,
      switchButton: false,
    },
  ];
  return (
    <ScreenRapperGrey>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container]}>
        <HeaderText text="General" textStyle={styles.textContainer} />
        {supportData?.map(item => (
          <PreferenceItem key={item.id} data={item} />
        ))}
        <HeaderText text="Woofmeets" textStyle={styles.bottomTextContainer} />
      </ScrollView>
    </ScreenRapperGrey>
  );
};

export default Preference;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    marginHorizontal:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '5%' : '7%',
    paddingVertical:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '3%' : '0%',
    fontSize: Text_Size.Text_9,
  },
  bottomTextContainer: {
    marginHorizontal:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
    paddingVertical:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '2%' : '0%',
    fontSize: Text_Size.Text_2,
  },
});
