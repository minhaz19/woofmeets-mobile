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
});
