/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useColorScheme,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileInfo from '../../../components/ScreenComponent/profile/BasicInfo/ProfileInfo';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useProfileData} from './utils/useProfileData';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import HeaderText from '../../../components/common/text/HeaderText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShortText from '../../../components/common/text/ShortText';
import {getProviderProfile} from '../../../store/slices/Provider/ProviderProfile/singlePet/providerProfileAction';
import {useNavigation} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import authStorage from '../../../utils/helpers/auth/storage';
import TitleText from '../../../components/common/text/TitleText';
import {getUserOnboardStatus} from '../../../store/slices/connect/stripe';
import {getUserServices} from '../../../store/slices/profile/services';
import {getUserProfileInfo} from '../../../store/slices/userProfile/userProfileAction';

const Profile = (props: {
  navigation: {navigate: (arg0: string, arg1?: any) => any};
}) => {
  const {colors} = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const {loading} = useAppSelector(state => state.userProfile);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  // useProfileData();

  const [token, setToken] = useState<any>();
  console.log(token);
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
    dispatch(getUserOnboardStatus());
    dispatch(getUserServices());
    dispatch(getUserProfileInfo());
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      {loading && <AppActivityIndicator visible={true} />}
      <View style={styles.rootContainer}>
        {!token?.provider && (
          <View style={{paddingVertical: 20}}>
            <TitleText
              textStyle={{color: Colors.blue, textAlign: 'center'}}
              text={
                'Your sitter request status in under progress, you will be notified when your status changes'
              }
            />
          </View>
        )}
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
              onPress={async () => {
                await dispatch(getProviderProfile(token?.opk));
                navigation.navigate('ProviderNavigator', {
                  providerOpk: token?.opk,
                });
              }}>
              <ShortText text="View Profile" textStyle={styles.text} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.serviceContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ServiceSetting')}
            style={styles.flexContainer}>
            <HeaderText
              text={'Service Settings'}
              textStyle={styles.descriptionStyle}
            />
            <View>
              <MaterialCommunityIcons
                name={'chevron-right'}
                size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 28}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileModify')}
            style={styles.flexContainer}>
            <HeaderText
              text={'Modify Your Accounts'}
              textStyle={styles.descriptionStyle}
            />
            <View>
              <MaterialCommunityIcons
                name={'chevron-right'}
                size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 28}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ManageBusiness')}
            style={styles.flexContainer}>
            <HeaderText
              text={'Manage Business'}
              textStyle={styles.descriptionStyle}
            />
            <View>
              <MaterialCommunityIcons
                name={'chevron-right'}
                size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 28}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '5%' : '6%',
    paddingTop: 10,
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
    paddingVertical: 6,
  },

  text: {
    color: 'white',
    textAlign: 'center',
    padding: 4,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 50,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
