import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';

const ResendCode = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wait for 00:23 sec </Text>
      <TouchableOpacity>
        <Text style={styles.textBtn}> Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResendCode;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: Text_Size.Text_0,
    justifyContent: 'center',
  },
  textBtn: {color: Colors.primary, fontWeight: '500', alignSelf: 'center'},
});
