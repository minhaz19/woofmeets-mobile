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
import {loginValue} from '../../../utils/config/initalValues';
import {
  loginInitalState,
  othersAuthIcons,
} from '../../../utils/config/Data/loginDatas';
import {loginValidationSchema} from '../../../utils/config/validationSchema';
import {useDispatch} from 'react-redux';
import {setUserLoggedIn} from '../../../store/slices/userLogin';
interface Props {
  navigation: {navigate: (arg0: string) => void};
}
const Login = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(setUserLoggedIn());
    navigation.navigate('SetNewPassword');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
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
          <AuthHeader
            title={loginInitalState.title}
            subTitle={loginInitalState.subTitle}
            image={loginInitalState.image}
          />
          <AuthForm
            initialValues={loginValue}
            validationSchema={loginValidationSchema}
            handleSubmit={handleSubmit}
            btnTitle="LOGIN"
          />
          <AuthFooter
            icons={othersAuthIcons}
            accountType="Don't have any account? "
            authType="Sign Up"
            title="or login with"
            navigateScreen="SignUp"
          />
        </KeyboardAvoidingView>
        <View style={styles.view} />
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'flex-end',
  },
  infoContainer: {
    flexGrow: 1,
    marginTop: 120,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
  },
  view: {
    height: 40,
  },
});
