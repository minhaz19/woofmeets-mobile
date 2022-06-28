import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Divider} from '@rneui/themed';
import Icon from '../../common/Icon';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
const LoginFooter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <Divider orientation="vertical" width={5} />
        <View style={styles.loginWith}>
          <Text style={styles.loginTitle}>Or login with</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Icon name={'google'} />
        <Icon name={'facebook-square'} />
        <Icon name={'apple1'} />
      </View>
      <View>
        <Text style={styles.haveAccount}>
          Do you have any account?{' '}
          <Text style={{color: Colors.primary}}>Sign In</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginFooter;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  dividerContainer: {marginTop: '5%'},
  loginWith: {alignItems: 'center'},
  loginTitle: {
    top: -10,
    backgroundColor: 'white',
    textAlign: 'center',
    width: '40%',
    color: Colors.light.lighttext,
    fontSize: Text_Size.Text_0,
  },
  iconContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  haveAccount: {
    textAlign: 'center',
    marginTop: '10%',
    fontSize: Text_Size.Text_0,
  },
});
