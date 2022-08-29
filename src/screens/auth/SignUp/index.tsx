import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../../../constants/Colors';
import AuthHeader from '../../../components/ScreenComponent/Auth/Common/AuthHeader';
import AuthFooter from '../../../components/ScreenComponent/Auth/Common/AuthFooter';
import {signupValue} from '../../../utils/config/initalValues';
import {signUpValidationSchema} from '../../../utils/config/validationSchema';
import {
  othersAuthIcons,
  signUpInitalState,
} from '../../../utils/config/Data/signUpDatas';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import AppForm from '../../../components/common/Form/AppForm';
import SignUpAuthForm from '../../../components/ScreenComponent/Auth/SignUp/SignUpAuthForm';
import {registerUser} from '../../../store/slices/auth/userAction';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AppActivityIndicator from '../../../components/Loaders/AppActivityIndicator';
interface Props {
  navigation: {navigate: (arg0: string) => void};
}
interface RegProps {
  email: string;
  firstName: string;
  lastName: string;
  zipcode: string;
  password: string;
  term: boolean;
}
const SignUp = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {isLoggedIn, providerLoading, loading} = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('BottomTabNavigator');
    }
  }, [navigation, isLoggedIn]);

  const handleSubmit = (regInfo: RegProps) => {
    dispatch(registerUser(regInfo));
  };

  return (
    <>
      {providerLoading && <AppActivityIndicator visible />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            backgroundColor: isDarkMode
              ? Colors.dark.background
              : Colors.secondary,
          },
        ]}>
        <KeyboardAvoidingView
          style={styles.container}
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              <SignUpAuthForm
                handleSubmit={handleSubmit}
                btnTitle="SIGN UP"
                termsAndCond
                loading={loading}
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
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
