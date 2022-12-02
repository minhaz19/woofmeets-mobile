import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import AuthForm from '../../../../components/ScreenComponent/Auth/Common/AuthForm';
import {forgotPasswordValue} from '../../../../utils/config/initalValues/initalValues';
import {forgotPasswordValidationSchema} from '../../../../utils/config/ValidationSchema/validationSchema';
import ImageAndTitle from '../../../../components/ScreenComponent/Auth/Common/ImageAndTitle';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import BottomSpacing from '../../../../components/UI/BottomSpacing';
import AppForm from '../../../../components/common/Form/AppForm';
import {useFPEmail} from './utils/useFPEmail';
import {AuthPassword} from '../../../../assets/svgs/SVG_LOGOS';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import ScrollViewRapper from '../../../../components/common/ScrollViewRapper';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
const forgotPassData = {
  title: 'Forgot Password?',
};
interface Props {
  navigation: {
    navigate: (arg0: string, arg2: any) => void;
    goBack: () => void;
  };
}
const ForgotPassword = ({navigation}: Props) => {
  const {isDarkMode} = useTheme();
  const {handleSubmit, loading} = useFPEmail(navigation);
  return (
    <ScrollViewRapper extraHeight={40} extraScrollHeight={120}>
      <View style={styles.container}>
        <View
          style={[
            styles.infoContainer,
            {
              backgroundColor: Colors.background,
            },
          ]}>
          <ImageAndTitle Icon={AuthPassword} title={forgotPassData.title} id={0} />
          <AppForm
            initialValues={forgotPasswordValue}
            validationSchema={forgotPasswordValidationSchema}>
            <AuthForm
              handleSubmit={handleSubmit}
              btnTitle="Continue"
              forgotPassword
              onPress={() => navigation.goBack()}
              loading={loading}
            />
          </AppForm>
          <View style={styles.view} />
        </View>
      </View>
    </ScrollViewRapper>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
  },
  infoContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    bottom: 0,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '20%' : 20,
  },
  view: {height: 20},
});
