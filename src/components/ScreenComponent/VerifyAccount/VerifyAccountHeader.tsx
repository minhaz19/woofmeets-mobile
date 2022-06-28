import {StyleSheet, Text, View, Image, useColorScheme} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';

const VerifyAccountHeader = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../../assets/image/login/logo.png')}
      />
      <View>
        <Text
          style={[
            styles.title,
            {
              color: isDarkMode ? Colors.dark.text : Colors.headerText,
            },
          ]}>
          Verify Account
        </Text>
        <Text
          style={[
            styles.subTitle,
            {
              color: isDarkMode ? Colors.dark.text : Colors.headerText,
            },
          ]}>
          We have sent an otp(one time password) to your email. Please enter the
          4 digit code below to continue.
        </Text>
      </View>
    </View>
  );
};

export default VerifyAccountHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  title: {
    fontSize: Text_Size.Text_5,
    fontWeight: 'bold',
    marginTop: 40,
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: Text_Size.Text_1,
    marginTop: 20,
    alignItems: 'center',
  },
});
