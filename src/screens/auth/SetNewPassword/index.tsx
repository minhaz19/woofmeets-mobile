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

const SetNewPassword = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const handleSubmit = (values: any) => {
    console.log('values', values);
  };
  return (
    <ScrollView
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
    flex: 1,
  },
  infoContainer: {
    flexGrow: 1,
    marginTop: 120,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
  },
  view: {
    height: 80,
  },
});
