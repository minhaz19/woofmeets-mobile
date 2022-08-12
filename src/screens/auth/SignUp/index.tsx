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
import AuthHeader from '../../../components/ScreenComponent/Auth/Common/AuthHeader';
import AuthForm from '../../../components/ScreenComponent/Auth/Common/AuthForm';
import AuthFooter from '../../../components/ScreenComponent/Auth/Common/AuthFooter';
import {signupValue} from '../../../utils/config/initalValues';
import {signUpValidationSchema} from '../../../utils/config/validationSchema';
import {
  othersAuthIcons,
  signUpInitalState,
} from '../../../utils/config/Data/signUpDatas';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import AppForm from '../../../components/common/Form/AppForm';

interface Props {
  navigation: {navigate: (arg0: string) => void};
}
const SignUp = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const handleSubmit = () => {
    navigation.navigate('VerifyAccount');
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
          <AuthHeader
            title={signUpInitalState.title}
            subTitle={signUpInitalState.subTitle}
            image={signUpInitalState.image}
          />
          <AppForm
            initialValues={signupValue}
            validationSchema={signUpValidationSchema}>
            <AuthForm
              handleSubmit={handleSubmit}
              btnTitle="SIGN UP"
              termsAndCond
            />
          </AppForm>
          <AuthFooter
            icons={othersAuthIcons}
            accountType="Already have an account? "
            authType="LOGIN"
            title="or login with"
            navigateScreen="LogIn"
          />
          <View style={styles.view} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  infoContainer: {
    flexGrow: 1,
    marginTop: 120,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '20%' : 20,
  },
  view: {
    height: 40,
  },
});
