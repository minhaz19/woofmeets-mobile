/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import AuthHeader from '../../../../components/ScreenComponent/Auth/Common/AuthHeader';
import AuthForm from '../../../../components/ScreenComponent/Auth/Common/AuthForm';

import {
  forgotPasswordResetValidationSchema,
  setPasswordValidationSchema,
} from '../../../../utils/config/validationSchema';
import {resetForgotPassword} from '../../../../utils/config/Data/setNewPasswordDatas';
import {forgotPasswordReset} from '../../../../utils/config/initalValues';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';
import AppForm from '../../../../components/common/Form/AppForm';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';

interface Props {
  navigation: {
    goBack: () => void;
    navigate: (arg0: string) => void;
  };
}
const slug = '/auth/forget-password';
const ForgotPasswordReset = ({navigation}: Props) => {
  const height = SCREEN_HEIGHT;
  const isDarkMode = useColorScheme() === 'dark';
  const {request, loading} = useApi(methods._post);
  const handleSubmit = async ({newPassword}: any) => {
    const result = await request(slug, {password: newPassword});
    if (result.ok) {
      navigation.navigate('LogIn');
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        // height: '100%',
        flex: height > 800 ? 1 : 0,
        justifyContent: height > 800 ? 'flex-end' : 'flex-start',
      }}
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
    height: 20,
  },
});
