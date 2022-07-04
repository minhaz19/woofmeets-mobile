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
const forgotPassData = {
  image: require('../../../assets/image/forgotPassword/email.png'),
  title: 'Forgot Password?',
  subTitle:
    'We have sent an OTP (One Time Password) to your [Email]. Please enter the 4 digit code below to continue.',
};
const ForgotPasswordOtp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const handleSubmit = (value: {}) => {
    console.log('value ogp', value);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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
              ? Colors.dark.lightDark
              : Colors.background,
          },
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ImageAndTitle
            image={forgotPassData.image}
            title={forgotPassData.title}
            subTitle={forgotPassData.subTitle}
          />
          <AuthForm
            initialValues={forgotPasswordOtpValue}
            validationSchema={forgotPasswordOtpValidationSchema}
            handleSubmit={handleSubmit}
            btnTitle="Continue"
            btn2Title="Resend Code"
            forgotPasswordOpt
          />
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    height: '100%',
    marginTop: 150,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    bottom: 0,
  },
});
