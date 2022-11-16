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
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TitleText from '../../../components/common/text/TitleText';
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
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          enabled={Platform.OS === 'ios' ? true : false}>
          <AppTouchableOpacity
            style={styles.leftContainer}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name="ios-chevron-back"
              size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
              style={styles.iconStyle}
              color={Colors.primary}
            />
            <TitleText text={'Back'} textStyle={styles.backText} />
          </AppTouchableOpacity>
          <View
            style={[
              styles.infoContainer,
              {
                backgroundColor: Colors.background,
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
  iconStyle: {paddingRight: 5},
  leftContainer: {
    // position: 'absolute',
    // top: 10,
    left: '2%',
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  backText: {color: Colors.primary, fontWeight: 'bold'},
});
