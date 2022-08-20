import {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import {LoginManager} from 'react-native-fbsdk-next';

export const useHandleProviderAuth = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '527665236551-b62374li29m4maonk4n3bkv0a5uacnp4.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId:
        '527665236551-ecpfe6kab9q918ca6t3u4eddpmlctupo.apps.googleusercontent.com',
    });
  }, []);
  const google = async () => {
    console.log('auth');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser({userInfo});
    } catch (error: any) {
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
  const facebook = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result: any) {
        if (result.isCancelled) {
          Alert.alert('Login Cancelled ' + JSON.stringify(result));
        } else {
          setUser(result);
          Alert.alert(
            'Login success with  permisssions: ' +
              result.grantedPermissions.toString(),
          );
          Alert.alert('Login Success ' + result.toString());
        }
      },
      function (error) {
        Alert.alert('Login failed with error: ' + error);
      },
    );
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
