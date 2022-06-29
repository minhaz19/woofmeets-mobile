import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import Screen from '../../components/common/Screen';
import Colors from '../../constants/Colors';
import LoginHeader from '../../components/ScreenComponent/Login/LoginHeader';
import LoginFooter from '../../components/ScreenComponent/Login/LoginFooter';
import LoginInput from '../../components/ScreenComponent/Login/LoginInput';

const Login = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Screen
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.background
            : Colors.secondary,
        },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={50}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[
              styles.infoContainer,
              {
                backgroundColor: isDarkMode
                  ? Colors.dark.lightDark
                  : Colors.background,
              },
            ]}>
            <LoginHeader />
            <LoginInput />
            <LoginFooter />
            <View style={styles.view} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flexGrow: 1,
    marginTop: 70,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
  },
  view: {
    height: 80,
  },
});
