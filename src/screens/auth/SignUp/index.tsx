import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import AuthHeader from '../../../components/ScreenComponent/Auth/Common/AuthHeader';
import AuthFooter from '../../../components/ScreenComponent/Auth/Common/AuthFooter';
import {signupValue} from '../../../utils/config/initalValues/initalValues';
import {signUpValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';
import {signUpInitalState} from '../../../utils/config/Data/signUpDatas';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import AppForm from '../../../components/common/Form/AppForm';
import SignUpAuthForm from '../../../components/ScreenComponent/Auth/SignUp/SignUpAuthForm';
import {useSignUp} from './utils/useSignUp';
import {othersAuthIcons} from '../../../utils/config/Data/loginDatas';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ScrollViewRapper from '../../../components/common/ScrollViewRapper';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TitleText from '../../../components/common/text/TitleText';
interface Props {
  navigation: {navigate: (arg0: string) => void};
}

const SignUp = ({navigation}: Props) => {
  const {isDarkMode} = useTheme();
  const {handleSubmit, loading} = useSignUp(navigation);

  return (
    <>
      <ScrollViewRapper extraHeight={0} extraScrollHeight={0}>
        <View
          style={[
            styles.infoContainer,
            {
              backgroundColor: isDarkMode
                ? Colors.dark.lightDark
                : Colors.background,
            },
          ]}>
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
        </View>
      </ScrollViewRapper>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  infoContainer: {
    flexGrow: 1,
    paddingTop: 60,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
  },
  view: {
    height: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {paddingRight: 5},
  leftContainer: {
    // position: 'absolute',
    // top: 10,
    left: '0%',
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {color: Colors.primary, fontWeight: 'bold'},
});
