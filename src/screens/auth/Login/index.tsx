import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Colors from '../../../constants/Colors';
import AuthHeader from '../../../components/ScreenComponent/Auth/Common/AuthHeader';
import AuthForm from '../../../components/ScreenComponent/Auth/Common/AuthForm';
import AuthFooter from '../../../components/ScreenComponent/Auth/Common/AuthFooter';
import {loginValue} from '../../../utils/config/initalValues/initalValues';
import {
  loginInitalState,
  othersAuthIcons,
} from '../../../utils/config/Data/loginDatas';
import {loginValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import AppForm from '../../../components/common/Form/AppForm';
// import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {useLogin} from './utils/useLogin';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
interface Props {
  navigation: {navigate: (arg0: string) => void};
}
const Login = ({navigation}: Props) => {
  const {isDarkMode, colors} = useTheme();
  const {handleSubmit, providerLoading, loading} = useLogin(navigation);
  return (
    <>
      {/* {providerLoading && <AppActivityIndicator visible={true} />} */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        style={[
          {
            backgroundColor: isDarkMode
              ? Colors.dark.lightDark
              : colors.backgroundColor,
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
              title={loginInitalState.title}
              subTitle={loginInitalState.subTitle}
              image={loginInitalState.image}
            />

            <AppForm
              initialValues={loginValue}
              validationSchema={loginValidationSchema}>
              <AuthForm
                handleSubmit={handleSubmit}
                btnTitle="LOGIN"
                loading={loading}
              />
            </AppForm>
            <AuthFooter
              icons={othersAuthIcons}
              accountType="Don't have any account? "
              authType="Sign Up"
              title="or login with"
              navigateScreen="SignUp"
            />
            <View style={styles.view} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
  },
  infoContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    bottom: 0,
    // flexGrow: 1,
    // marginTop: 120,
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    // padding: 20,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '20%' : 20,
  },
  view: {
    height: 40,
  },
});
