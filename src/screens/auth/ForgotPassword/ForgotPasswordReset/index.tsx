/* eslint-disable react-native/no-inline-styles */

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import AuthHeader from '../../../../components/ScreenComponent/Auth/Common/AuthHeader';
import AuthForm from '../../../../components/ScreenComponent/Auth/Common/AuthForm';
import {forgotPasswordResetValidationSchema} from '../../../../utils/config/ValidationSchema/validationSchema';
import {resetForgotPassword} from '../../../../utils/config/Data/setNewPasswordDatas';
import {forgotPasswordReset} from '../../../../utils/config/initalValues/initalValues';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';
import AppForm from '../../../../components/common/Form/AppForm';
import {RouteProp} from '@react-navigation/native';
import {useFPReset} from './utils/useFPReset';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';

interface Props {
  navigation: {
    goBack: () => void;
    navigate: (arg0: string) => void;
  };
  route: RouteProp<{params: {token: string}}, 'params'>;
}
const ForgotPasswordReset = ({route, navigation}: Props) => {
  const height = SCREEN_HEIGHT;
  const {isDarkMode} = useTheme();
  const {handleSubmit, loading} = useFPReset(navigation, route);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: height > 800 ? 1 : 0,
        justifyContent: 'center',
      }}
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.lightDark
            : Colors.background,
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
            title={resetForgotPassword.title}
            subTitle={resetForgotPassword.subTitle}
            image={resetForgotPassword.image}
          />
          <AppForm
            initialValues={forgotPasswordReset}
            validationSchema={forgotPasswordResetValidationSchema}>
            <AuthForm
              handleSubmit={handleSubmit}
              btnTitle="Confirm"
              onPress={() => navigation.goBack()}
              forgotPasswordReset
              loading={loading}
            />
          </AppForm>
          <View style={styles.view} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ForgotPasswordReset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flexGrow: 1,

    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '20%' : 20,
  },
  view: {
    height: 20,
  },
});
