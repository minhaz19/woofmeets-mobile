import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import FirstScreenSvg from '../../components/common/FirstScreenSvg';

const FirstScreen = () => {
  return (
    <View style={[styles.container, {backgroundColor: Colors.primary}]}>
      <View
        style={[
          styles.backgroundCover,
          {
            transform: [{rotate: '-30deg'}],
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
            transform: [{rotate: '-30deg'}],
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
            transform: [{rotate: '-30deg'}],
            marginTop: 550,
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
    opacity: 0.9,
  },
  roundContainer: {
    borderRadius: 100,
    width: 100,
    height: 100,
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
  },
});
