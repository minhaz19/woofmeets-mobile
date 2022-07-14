/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import FirstScreenSvg from '../../components/common/FirstScreenSvg';
import {SCREEN_WIDTH} from '../../constants/WindowSize';

const FirstScreen = () => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.backgroundCover,
          {
            marginTop: 50,
          },
        ]}>
        <FirstScreenSvg />
        <FirstScreenSvg />
        <FirstScreenSvg />
      </View>
      <View
        style={[
          styles.backgroundCover,
          {
            marginTop: 300,
          },
        ]}>
        <FirstScreenSvg />
        <FirstScreenSvg />
        <FirstScreenSvg />
      </View>
      <View
        style={[
          styles.backgroundCover,
          {
            marginTop: 550,
          },
        ]}>
        <FirstScreenSvg />
        <FirstScreenSvg />
        <FirstScreenSvg />
      </View>
      <View
        style={[
          styles.backgroundCover,
          {
            marginTop: 800,
          },
        ]}>
        <FirstScreenSvg />
        <FirstScreenSvg />
        <FirstScreenSvg />
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.roundContainer}
          resizeMode="contain"
          source={require('../../assets/image/login/logo.png')}
        />
      </View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    opacity: 1,
    backgroundColor: Colors.primary,
  },
  roundContainer: {
    borderRadius: 100,
    width: SCREEN_WIDTH <= 380 ? 80 : SCREEN_WIDTH <= 600 ? 140 : 150,
    height: SCREEN_WIDTH <= 380 ? 80 : SCREEN_WIDTH <= 600 ? 140 : 150,
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'white',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginRight: 50,
    // marginLeft: 50,
    position: 'absolute',
    transform: [{rotate: '-25deg'}],
  },
});
