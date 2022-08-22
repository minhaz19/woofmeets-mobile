/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import AuthForm from '../../../components/ScreenComponent/Auth/Common/AuthForm';
import {forgotPasswordOtpValue} from '../../../utils/config/initalValues';
import {forgotPasswordOtpValidationSchema} from '../../../utils/config/validationSchema';
import ImageAndTitle from '../../../components/ScreenComponent/Auth/Common/ImageAndTitle';
import {AuthEmail} from '../../../assets/svgs/SVG_LOGOS';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import AppForm from '../../../components/common/Form/AppForm';
const forgotPassData = {
  icon: AuthEmail,
  title: 'Forgot Password?',
  subTitle:
    'We have sent an OTP (One Time Password) to your [Email]. Please enter the 4 digit code below to continue.',
};
interface Props {
  navigation: {
    navigate: (arg0: string) => void;
  };
}
const ForgotPasswordOtp = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const handleSubmit = (value: {}) => {
    navigation.navigate('AfterIntroScreen');
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      style={[
        {
          backgroundColor: isDarkMode
            ? Colors.dark.background
            : Colors.secondary,
        },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios' ? true : false}>
        <View
          style={[
            styles.infoContainer,
            {
              backgroundColor: isDarkMode
                ? Colors.dark.lightDark
                : Colors.background,
            },
          ]}>
          <ImageAndTitle
            Icon={forgotPassData.icon}
            title={forgotPassData.title}
            subTitle={forgotPassData.subTitle}
          />
          <AppForm
            initialValues={forgotPasswordOtpValue}
            validationSchema={forgotPasswordOtpValidationSchema}>
            <AuthForm
              handleSubmit={handleSubmit}
              btnTitle="Continue"
              btn2Title="Resend Code"
              forgotPasswordOpt
            />
          </AppForm>
          {SCREEN_WIDTH > 800 && <BottomSpacing />}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ForgotPasswordOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  infoContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    paddingBottom: SCREEN_WIDTH < 800 ? 40 : 0,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '20%' : 20,
    bottom: 0,
  },
});
