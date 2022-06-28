import {StyleSheet, useColorScheme, View} from 'react-native';
import React from 'react';
import VerifyAccountHeader from '../../components/ScreenComponent/VerifyAccount/VerifyAccountHeader';
import VerifyAccountInput from '../../components/ScreenComponent/VerifyAccount/VerifyAccountInput';
import Colors from '../../constants/Colors';

const VerifyAccount = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.background
            : Colors.secondary,
        },
      ]}>
      <View
        style={[
          styles.infoContainer,
          {
            backgroundColor: isDarkMode
              ? Colors.dark.background
              : Colors.background,
          },
        ]}>
        <VerifyAccountHeader />
        <VerifyAccountInput />
      </View>
    </View>
  );
};

export default VerifyAccount;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.secondary,
    flex: 1,
  },
  infoContainer: {
    // backgroundColor: 'white',
    flex: 1,
    top: 70,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
  },
});
