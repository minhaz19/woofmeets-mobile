/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import ProfileInfo from '../../../components/ScreenComponent/profile/ProfileInfo';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import DescriptionText from '../../../components/common/text/DescriptionText';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import {useAppSelector} from '../../../store/store';
import {useProfileData} from './utils/useProfileData';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import ServiceSetting from '../../../components/ScreenComponent/setting/subProfile/ServiceSetting';
import ProfileModify from '../../../components/ScreenComponent/setting/subProfile/ProfileModify';
import HeaderText from '../../../components/common/text/HeaderText';

const Profile = () => {
  const [activeService, setActiveService] = useState<string>('service');
  const {colors} = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const {userServices, userServicesLoading} = useAppSelector(
    (state: any) => state.services,
  );

  const serviceData = userServices !== null && userServices;

  useProfileData();
  return (
    <>
      {userServicesLoading && <AppActivityIndicator visible={true} />}
      <View
        style={[
          styles.rootContainer,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            <ProfileInfo />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isDarkMode
                    ? Colors.button.grey
                    : Colors.primary,
                },
                {
                  borderColor: colors.borderColor,
                },
              ]}
              onPress={() => {}}>
              <HeaderText text="View Profile" textStyle={styles.text} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.serviceContainer}>
          <TouchableOpacity
            onPress={() => setActiveService('service')}
            style={[
              styles.buttonStyles,
              {
                backgroundColor:
                  activeService === 'service' ? Colors.primary : 'white',
              },
            ]}>
            <DescriptionText
              text={'Service Settings'}
              textStyle={styles.descriptionStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveService('modify')}
            style={[
              styles.buttonStyles,
              {
                backgroundColor:
                  activeService === 'modify' ? Colors.primary : 'white',
              },
            ]}>
            <DescriptionText
              text={'Modify Your Accounts'}
              textStyle={styles.descriptionStyle}
            />
          </TouchableOpacity>
        </View>
        {activeService === 'service' ? (
          <ServiceSetting serviceData={serviceData} />
        ) : (
          <ProfileModify />
        )}
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '5%' : '6%',
  },
  profileContainer: {
    width: '70%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  buttonContainer: {
    width: '30%',
  },
  buttonStyles: {
    borderWidth: 1,
    borderColor: Colors.light.borderColor,
    width: '50%',
  },
  descriptionStyle: {
    alignSelf: 'center',
    fontSize: Text_Size.Text_1,
    paddingVertical: 6,
    color: Colors.black,
  },

  text: {color: 'white', textAlign: 'center'},
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 4,
    borderWidth: 1,
    // borderColor: Colors.light.borderColor,
    borderRadius: 50,
  },
});
