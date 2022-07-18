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
import {verifyAccountValue} from '../../../utils/config/initalValues';
import {verifyAccountValidationSchema} from '../../../utils/config/validationSchema';
import ImageAndTitle from '../../../components/ScreenComponent/Auth/Common/ImageAndTitle';
const forgotPassData = {
  image: require('../../../assets/image/verifyAccount/logo.png'),
  title: 'Verify Account',
  subTitle:
    'We have sent an OTP (One Time Password) to your [Email]. Please enter the 4 digit code below to continue.',
};
interface Props {
  navigation: {navigate: (arg0: string) => void};
}
const VerifyAccount = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const handleSubmit = (value: {}) => {
    console.log('value veri', value);
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
            image={forgotPassData.image}
            title={forgotPassData.title}
            subTitle={forgotPassData.subTitle}
          />
          <AuthForm
            initialValues={verifyAccountValue}
            validationSchema={verifyAccountValidationSchema}
            handleSubmit={handleSubmit}
            btnTitle="Continue"
            btn2Title="Resend Code"
            verifyAccount
          />
        </KeyboardAvoidingView>
        <View style={styles.view} />
      </View>
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
  },
  view: {height: 70},
});
