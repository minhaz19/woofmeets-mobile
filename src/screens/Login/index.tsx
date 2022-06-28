import {StyleSheet, View} from 'react-native';
import React from 'react';
import Screen from '../../components/common/Screen';
import Colors from '../../constants/Colors';
import LoginHeader from '../../components/ScreenComponent/Login/LoginHeader';
import LoginFooter from '../../components/ScreenComponent/Login/LoginFooter';
import LoginInput from '../../components/ScreenComponent/Login/LoginInput';

const Login = () => {
  return (
    <Screen style={styles.container}>
      <View style={styles.infoContainer}>
        <LoginHeader />
        <LoginInput />
        <LoginFooter />
      </View>
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  infoContainer: {
    backgroundColor: 'white',
    flex: 1,
    top: 70,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
  },
});
