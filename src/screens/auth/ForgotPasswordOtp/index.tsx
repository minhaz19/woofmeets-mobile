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
    console.log('value ogp', value);
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
            Icon={forgotPassData.icon}
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
    justifyContent: 'flex-end',
  },
  infoContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    bottom: 0,
  },
});
