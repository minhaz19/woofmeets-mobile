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
import {forgotPasswordValue} from '../../../utils/config/initalValues';
import {forgotPasswordValidationSchema} from '../../../utils/config/validationSchema';
import ImageAndTitle from '../../../components/ScreenComponent/Auth/Common/ImageAndTitle';
const forgotPassData = {
  image: require('../../../assets/image/forgotPassword/password.png'),
  title: 'Forgot Password?',
};
interface Props {
  navigation: {navigate: (arg0: string) => void};
}
const ForgotPassword = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const handleSubmit = () => {
    navigation.navigate('ForgotPasswordOtp');
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
          />
          <AuthForm
            initialValues={forgotPasswordValue}
            validationSchema={forgotPasswordValidationSchema}
            handleSubmit={handleSubmit}
            btnTitle="Continue"
            forgotPassword
          />
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

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
