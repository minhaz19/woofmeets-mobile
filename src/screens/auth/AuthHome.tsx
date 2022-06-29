import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import React from 'react';
import Text_Size from '../../constants/textScaling';
import Colors from '../../constants/Colors';
import Login from '../Login';

const AuthHome = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return <Login />;
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: Text_Size.Text_1,
    fontFamily: 'Arial',
    paddingHorizontal: '5%',
  },
  headerText: {
    fontSize: Text_Size.Text_4,
    fontFamily: 'Arial',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
});

export default AuthHome;
