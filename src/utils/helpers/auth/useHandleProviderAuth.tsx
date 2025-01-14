import {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert, Platform} from 'react-native';
import {LoginManager, Profile, Settings} from 'react-native-fbsdk-next';
import {
  providerAuth,
  appleAuthLogin,
} from '../../../store/slices/auth/userAction';
import {useAppDispatch} from '../../../store/store';
import {authProviderLoading} from '../../../store/slices/auth/userSlice';
// import {appleAuth} from '@invertase/react-native-apple-authentication';

import {
  appleAuth,
  AppleAuthError,
} from '@invertase/react-native-apple-authentication';

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
      // Alert.alert('Login failed');
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        Alert.alert('Login failed');
      }
    }
  };

  const facebook = async () => {
    Settings.initializeSDK();
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
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
          } catch (error) {}
        }
      }
    } catch (error) {
      Alert.alert('Login failed');
    }
  };

  const apple = async () => {
    try {
      if (Platform.OS === 'ios') {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        if (!appleAuthRequestResponse.identityToken) {
          throw 'Apple Sign-In failed - no identify token returned';
        }

        // get current authentication state for user
        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user,
        );

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
          // user is authenticated
          const {identityToken} = appleAuthRequestResponse;
          const userInfo = {
            token: identityToken,
            firstname: appleAuthRequestResponse.fullName?.givenName
              ? appleAuthRequestResponse.fullName?.givenName
              : ' ',
            lastname: appleAuthRequestResponse.fullName?.familyName
              ? appleAuthRequestResponse.fullName?.familyName
              : ' ',
          };
          dispatch(appleAuthLogin(userInfo));
        }
      }
    } catch (error) {
      if (error?.code === AppleAuthError.CANCELED) {
      } else {
        // other unknown error
      }
    }
  };

  const handleGFauth = (auth: number | boolean) => {
    switch (auth) {
      case 0:
        return google();
      case 1:
        return facebook();
      case 2:
        return apple();
      default:
        false;
    }
  };

  return {handleGFauth, user};
};
