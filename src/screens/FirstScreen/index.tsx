import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import FirstScreenSvg from '../../components/common/FirstScreenSvg';
import {SCREEN_WIDTH} from '../../constants/WindowSize';

const FirstScreen = () => {
  const data = [
    {id: 1, marginTop: -200},
    {id: 2, marginTop: 0},
    {id: 3, marginTop: 200},
    {id: 4, marginTop: 400},
    {id: 5, marginTop: 600},
    {id: 6, marginTop: 800},
    {id: 7, marginTop: 600},
    {id: 8, marginTop: 700},
    {id: 9, marginTop: 800},
    {id: 10, marginTop: 900},
  ];
  return (
    <View style={styles.container}>
      {data.map(item => (
        <View
          style={[
            styles.backgroundCover,
            {
              marginTop: item.id * 50 + item.marginTop,
            },
          ]}
          key={item.id}>
          <FirstScreenSvg />
          <FirstScreenSvg />
          <FirstScreenSvg />
          <FirstScreenSvg />
          <FirstScreenSvg />
          <FirstScreenSvg />
          <FirstScreenSvg />
        </View>
      ))}
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
    marginLeft: -20,
    // marginRight: 50,
    // marginLeft: 50,
    position: 'absolute',
    transform: [{rotate: '-25deg'}],
  },
});
