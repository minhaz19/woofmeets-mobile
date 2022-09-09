import {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import {LoginManager, Profile, Settings} from 'react-native-fbsdk-next';
import {providerAuth} from '../../../store/slices/auth/userAction';
import {useAppDispatch} from '../../../store/store';
import {authProviderLoading} from '../../../store/slices/auth/userSlice';

export const useHandleProviderAuth = () => {
  const [user, setUser] = useState({});
  const dispatch = useAppDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '313710503954-rfarp6c2ngohhtlo1cvpetiaj1lh8d2o.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId:
        '313710503954-3n02f9k6848u5f2lkoaefm5ii33pfivu.apps.googleusercontent.com',
    });
  }, []);
  const google = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.user) {
        // setUser(user);
        const userInfos = {
          email: userInfo?.user.email,
          firstName: userInfo?.user.givenName,
          lastName: userInfo?.user.familyName,
          provider: 'GOOGLE',
        };
        dispatch(providerAuth(userInfos));
        dispatch(authProviderLoading(true));
      }
    } catch (error: any) {
      Alert.alert('Login failed');
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const facebook = async () => {
    Settings.initializeSDK();
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      if (result) {
        if (result.isCancelled) {
          Alert.alert('Login Cancelled ' + JSON.stringify(result));
        } else {
          try {
            const currentProfile = await Profile.getCurrentProfile();
            if (currentProfile) {
              setUser(currentProfile);
              const userInfo = {
                email: currentProfile?.email,
                firstName: currentProfile?.firstName,
                lastName: currentProfile?.lastName,
                provider: 'FACEBOOK',
                facebookId: currentProfile?.userID,
              };
              dispatch(providerAuth(userInfo));
              dispatch(authProviderLoading(true));
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      Alert.alert('Login failed');
    }
  };

  const handleGFauth = (auth: number | boolean) => {
    switch (auth) {
      case 0:
        return google();
      case 1:
        return facebook();
      default:
        false;
    }
  };

  return {handleGFauth, user};
};
