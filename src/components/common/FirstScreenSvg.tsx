import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

const FirstScreenSvg = () => {
  return (
    <View style={styles.roundContainer}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/splash/ionic-md-paw.png')}
      />
    </View>
  );
};

export default FirstScreenSvg;

const styles = StyleSheet.create({
  roundContainer: {
    paddingRight: 150,
  },
  image: {
    width: 30,
    height: 30,
  },
});
