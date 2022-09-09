import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import TitleText from '../../../common/text/TitleText';

const ResendCode = () => {
  return (
    <View style={styles.container}>
      <TitleText textStyle={styles.text} text="Wait for 00:23 sec " />
      <TouchableOpacity>
        <TitleText textStyle={styles.textBtn} text="Resend Code" />
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
