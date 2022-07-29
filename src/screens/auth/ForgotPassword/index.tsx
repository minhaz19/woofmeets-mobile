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
import {AuthPassword} from '../../../assets/svgs/SVG_LOGOS';
const forgotPassData = {
  title: 'Forgot Password?',
};
interface Props {
  navigation: {
    navigate: (arg0: string) => void;
    goBack: () => void;
  };
}
const ForgotPassword = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const handleSubmit = () => {
    navigation.navigate('ForgotPasswordOtp');
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
          <ImageAndTitle Icon={AuthPassword} title={forgotPassData.title} />
          <AuthForm
            initialValues={forgotPasswordValue}
            validationSchema={forgotPasswordValidationSchema}
            handleSubmit={handleSubmit}
            btnTitle="Continue"
            forgotPassword
            onPress={() => navigation.goBack()}
          />
        </KeyboardAvoidingView>
        <View style={styles.view} />
      </View>
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
  },
  view: {height: 20},
});
