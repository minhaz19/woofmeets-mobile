import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import AuthForm from '../../../../components/ScreenComponent/Auth/Common/AuthForm';
import {forgotPasswordValue} from '../../../../utils/config/initalValues';
import {forgotPasswordValidationSchema} from '../../../../utils/config/validationSchema';
import ImageAndTitle from '../../../../components/ScreenComponent/Auth/Common/ImageAndTitle';
import {AuthPassword} from '../../../../assets/svgs/SVG_LOGOS';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import BottomSpacing from '../../../../components/UI/BottomSpacing';
import AppForm from '../../../../components/common/Form/AppForm';
import {useApi} from '../../../../utils/helpers/api/useApi';
import api from '../../../../api/methods';
const forgotPassData = {
  title: 'Forgot Password?',
};
const slug = '/auth/forget-password-otp-generate';
interface Props {
  navigation: {
    navigate: (arg0: string, arg2: any) => void;
    goBack: () => void;
  };
}
const ForgotPassword = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {request, loading} = useApi(api._post);
  const handleSubmit = async (e: any) => {
    const result = await request(slug, {
      email: e.email,
    });
    console.log(result);
    if (result.ok) {
      navigation.navigate('ForgotPasswordOtp', {email: e.email});
    }
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
          <ImageAndTitle Icon={AuthPassword} title={forgotPassData.title} />
          <AppForm
            initialValues={forgotPasswordValue}
            validationSchema={forgotPasswordValidationSchema}>
            <AuthForm
              handleSubmit={handleSubmit}
              btnTitle="Continue"
              forgotPassword
              onPress={() => navigation.goBack()}
              loading={loading}
            />
          </AppForm>
          <View style={styles.view} />
          {SCREEN_WIDTH > 800 && <BottomSpacing />}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ForgotPassword;

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

    paddingHorizontal: SCREEN_WIDTH > 800 ? '20%' : 20,
  },
  view: {height: 20},
});
