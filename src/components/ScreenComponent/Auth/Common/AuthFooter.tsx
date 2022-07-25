import {
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

interface Props {
  icons: {image: any; icon: any}[];
  title: string;
  accountType: string;
  authType: string;
  navigateScreen?: string;
}

const AuthFooter = ({
  icons,
  title,
  accountType,
  authType,
  navigateScreen,
}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();
  console.log('icon', icons);
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
    </View>
  );
};

export default AuthFooter;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
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
