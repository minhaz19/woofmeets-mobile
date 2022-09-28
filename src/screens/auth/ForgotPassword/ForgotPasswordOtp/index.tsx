import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import AuthForm from '../../../../components/ScreenComponent/Auth/Common/AuthForm';
import {otpValue} from '../../../../utils/config/initalValues/initalValues';
import {otpValidationSchema} from '../../../../utils/config/ValidationSchema/validationSchema';
import ImageAndTitle from '../../../../components/ScreenComponent/Auth/Common/ImageAndTitle';
import {AuthEmail} from '../../../../assets/svgs/SVG_LOGOS';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import BottomSpacing from '../../../../components/UI/BottomSpacing';
import AppForm from '../../../../components/common/Form/AppForm';
import {RouteProp} from '@react-navigation/native';
import {useFPOtp} from './utils/useFPOtp';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
const forgotPassData = {
  icon: AuthEmail,
  title: 'Forgot Password?',
  subTitle:
    'We have sent an OTP (One Time Password) to your [Email]. Please enter the 4 digit code below to continue.',
};
interface Props {
  navigation: {
    navigate: (arg0: string, arg2: {token: string}) => void;
  };
  route: RouteProp<{params: {email: string}}, 'params'>;
}
const ForgotPasswordOtp = ({route, navigation}: Props) => {
  const {isDarkMode} = useTheme();
  const {handleSubmit, loading} = useFPOtp(route, navigation);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      style={[
        {
          backgroundColor: isDarkMode
            ? Colors.dark.lightDark
            : Colors.background,
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
            initialValues={otpValue}
            validationSchema={otpValidationSchema}>
            <AuthForm
              handleSubmit={handleSubmit}
              btnTitle="Continue"
              btn2Title="Cancel"
              forgotPasswordOpt
              loading={loading}
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
    justifyContent: 'center',
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
