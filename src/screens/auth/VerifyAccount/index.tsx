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
import {verifyAccountValue} from '../../../utils/config/initalValues/initalValues';
import {verifyAccountValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';
import ImageAndTitle from '../../../components/ScreenComponent/Auth/Common/ImageAndTitle';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import AppForm from '../../../components/common/Form/AppForm';
const forgotPassData = {
  image: require('../../../assets/image/verifyAccount/logo.png'),
  title: 'Verify Account',
  subTitle:
    'We have sent an OTP (One Time Password) to your [Email]. Please enter the 6 digit code below to continue.',
};
interface Props {
  navigation: {navigate: (arg0: string) => void};
}
const VerifyAccount = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const handleSubmit = () => {
    navigation.navigate('AfterIntroScreen');
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      style={[
        {
          backgroundColor: Colors.secondary,
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
              backgroundColor: Colors.background,
            },
          ]}>
          <ImageAndTitle
            image={forgotPassData.image}
            title={forgotPassData.title}
            subTitle={forgotPassData.subTitle}
            Icon={undefined}
          />
          <AppForm
            initialValues={verifyAccountValue}
            validationSchema={verifyAccountValidationSchema}>
            <AuthForm
              handleSubmit={handleSubmit}
              btnTitle="Continue"
              btn2Title="Resend Code"
              verifyAccount
            />
          </AppForm>
          <View style={styles.view} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default VerifyAccount;

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
  view: {height: 70},
});
