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
import Colors from '../../../constants/Colors';
import AuthHeader from '../../../components/ScreenComponent/Auth/Common/AuthHeader';
import AuthForm from '../../../components/ScreenComponent/Auth/Common/AuthForm';

import {setPasswordValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';
import {setPasswordInfo} from '../../../utils/config/Data/setNewPasswordDatas';
import {setPasswordValue} from '../../../utils/config/initalValues/initalValues';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants/WindowSize';
import AppForm from '../../../components/common/Form/AppForm';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import {useResetPassword} from './utils/useResetPassword';

interface Props {
  navigation: {
    goBack: () => void;
    navigate: (arg0: string) => void;
  };
}
const SetNewPassword = ({navigation}: Props) => {
  const height = SCREEN_HEIGHT;
  const isDarkMode = useColorScheme() === 'dark';
  const {handleSubmit, loading} = useResetPassword();
  return (
    <ScrollView
      contentContainerStyle={{
        // height: '100%',
        flex: height > 800 ? 1 : 0,
        justifyContent: height > 800 ? 'center' : 'flex-start',
      }}
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.background
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
            title={setPasswordInfo.title}
            subTitle={setPasswordInfo.subTitle}
          />
          <AppForm
            initialValues={setPasswordValue}
            validationSchema={setPasswordValidationSchema}>
            <AuthForm
              handleSubmit={handleSubmit}
              btnTitle="Confirm"
              onPress={() => navigation.goBack()}
              setNewPassword={true}
              loading={loading}
            />
          </AppForm>
          <View style={styles.view} />
          <BottomSpacing />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SetNewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    // flexGrow: 1,
    // marginTop: '5%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '20%' : 20,
  },
  view: {
    // height: 60,
  },
});
