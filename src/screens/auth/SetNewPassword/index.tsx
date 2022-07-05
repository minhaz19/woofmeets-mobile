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

import {setPasswordValidationSchema} from '../../../utils/config/validationSchema';
import {setPasswordInfo} from '../../../utils/config/Data/setNewPasswordDatas';
import {setPasswordValue} from '../../../utils/config/initalValues';
import {SCREEN_HEIGHT} from '../../../constants/WindowSize';

interface Props {
  navigation: {
    goBack: () => void;
  };
}
const SetNewPassword = ({navigation}: Props) => {
  const height = SCREEN_HEIGHT;
  const isDarkMode = useColorScheme() === 'dark';
  const handleSubmit = (values: any) => {
    console.log('values', values);
  };
  console.log('getting height', height);
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
            title={setPasswordInfo.title}
            subTitle={setPasswordInfo.subTitle}
            image={setPasswordInfo.image}
          />
          <AuthForm
            initialValues={setPasswordValue}
            validationSchema={setPasswordValidationSchema}
            handleSubmit={handleSubmit}
            btnTitle="Confirm"
            onPress={() => navigation.goBack()}
            setNewPassword
          />
        </KeyboardAvoidingView>
        <View style={styles.view} />
      </View>
    </ScrollView>
  );
};

export default SetNewPassword;

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
  },
  view: {
    height: 20,
  },
});
