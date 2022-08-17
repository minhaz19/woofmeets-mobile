import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {Divider} from '@rneui/themed';
import Colors from '../../../../constants/Colors';
import Icon from '../../../common/Icon';
import Text_Size from '../../../../constants/textScaling';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoginManager} from 'react-native-fbsdk-next';
interface Props {
  icons: {image: any; icon: any}[];
  title: string;
  accountType: string;
  authType: string;
  navigateScreen?: string;
}
type StackParamList = {
  navigateScreen: {foo: string; onBar: () => void} | undefined;
};
type NavigationProps = StackNavigationProp<StackParamList>;

const AuthFooter = ({
  icons,
  title,
  accountType,
  authType,
  navigateScreen,
}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProps | any>();

  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <Divider orientation="vertical" width={5} />
        <View style={styles.loginWith}>
          <Text
            style={[
              styles.loginTitle,
              {
                backgroundColor: isDarkMode
                  ? Colors.dark.lightDark
                  : Colors.background,
                color: isDarkMode ? Colors.background : Colors.light.text,
              },
            ]}>
            {title}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        {icons.map((icon, index) => (
          <Icon key={index} IconComp={icon?.icon} />
        ))}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.haveAccount}>{accountType}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(navigateScreen)}>
          <Text style={styles.screenRoute}>{authType}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Facebook Login React Native Example</Text>
        <Button
          title={'Login with Facebook'}
          onPress={() => {
            LoginManager.logInWithPermissions(['public_profile', 'email']).then(
              function (result) {
                if (result.isCancelled) {
                  Alert.alert('Login Cancelled ' + JSON.stringify(result));
                } else {
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
          }}
        />
      </View>
    </View>
  );
};

export default AuthFooter;

const styles = StyleSheet.create({
  container: {
    marginTop: '2%',
  },
  dividerContainer: {marginTop: '5%'},
  loginWith: {alignItems: 'center'},
  loginTitle: {
    top: -10,
    textAlign: 'center',
    width: '40%',
    fontSize: Text_Size.Text_0,
  },
  iconContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    alignSelf: 'center',
  },
  haveAccount: {
    textAlign: 'center',
    fontSize: Text_Size.Text_0,
  },
  textContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenRoute: {
    fontSize: Text_Size.Text_0,
    color: Colors.primary,
    marginLeft: 3,
    textTransform: 'uppercase',
  },
});
