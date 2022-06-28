import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';

const LoginHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../../assets/image/login/logo.png')}
      />
      <View>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subTitle}>
          Discover your socal and try to login
        </Text>
      </View>
    </View>
  );
};

export default LoginHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  image: {width: 100, height: 100, marginTop: '0%'},
  title: {
    fontSize: Text_Size.Text_2,
    fontWeight: '600',
    marginTop: '3%',
  },
  subTitle: {
    marginTop: '2%',
    fontSize: Text_Size.Text_0,
  },
});
