import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {Divider} from '@rneui/themed';
import Colors from '../../../../constants/Colors';
import Icon from '../../../common/Icon';
import Text_Size from '../../../../constants/textScaling';

interface Props {
  icons: {image: any}[];
  title: string;
  accountType: string;
  authType: string;
}
const AuthFooter = ({icons, title, accountType, authType}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
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
              },
            ]}>
            {title}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        {icons.map((icon, index) => (
          <Icon key={index} image={icon.image} />
        ))}
      </View>
      <View>
        <Text style={styles.haveAccount}>
          {accountType}
          <Text style={{color: Colors.primary}}>{authType}</Text>
        </Text>
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
    color: Colors.light.lighttext,
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
    marginTop: '10%',
    fontSize: Text_Size.Text_0,
  },
});
