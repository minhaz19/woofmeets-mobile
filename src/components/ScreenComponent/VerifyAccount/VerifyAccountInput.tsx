/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';

const VerifyAccountInput = () => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <OTPInputView
        style={styles.otpView}
        pinCount={4}
        code={verificationCode}
        onCodeChanged={code => setVerificationCode(code)}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
        editable={true}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 10,
          marginBottom: 40,
        }}>
        <Text
          style={[
            {color: 'gray', fontSize: Text_Size.Text_1},
            {
              color: isDarkMode ? Colors.dark.text : Colors.headerText,
            },
          ]}>
          Wait for 00:23 sec.{' '}
        </Text>
        <TouchableOpacity>
          <Text
            style={[
              {fontSize: Text_Size.Text_1},
              {
                color: isDarkMode ? Colors.primary : Colors.primary,
              },
            ]}>
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor: isDarkMode ? Colors.background : Colors.primary,
          },
        ]}>
        <Text
          style={[
            styles.textStyle,
            {
              color: isDarkMode ? Colors.dark.background : Colors.background,
            },
          ]}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyAccountInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: Colors.primary,
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  underlineStyleHighLighted: {
    borderColor: Colors.primary,
  },
  otpView: {
    width: '80%',
    height: 100,
    marginVertical: 10,
  },

  buttonStyle: {
    // backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    // color: 'white',
    fontSize: Text_Size.Text_2,
  },
});
