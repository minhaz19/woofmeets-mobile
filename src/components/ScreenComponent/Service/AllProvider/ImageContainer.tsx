/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {replaceHostnameWithCDN} from '../../../../utils/helpers/imageOpt/replaceHostnameWithCDN';
interface Props {
  provider: any;
  rounded?: Boolean;
}
const ImageContainer = ({provider, rounded}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: '20%',
          height: '100%',
          // width: SCREEN_WIDTH > 800 ? SCREEN_WIDTH / 10 : SCREEN_WIDTH / 6,
          // height: SCREEN_WIDTH > 800 ? SCREEN_WIDTH / 10 : SCREEN_WIDTH / 6,
          // height: rounded
          //   ? SCREEN_WIDTH > 800
          //     ? SCREEN_WIDTH / 10
          //     : SCREEN_WIDTH / 8
          //   : SCREEN_HEIGHT / 10,
        },
      ]}>
      <Image
        source={{
          uri:
            provider?.user.image !== null
              ? replaceHostnameWithCDN(provider?.user?.image?.url, {
                  height: 100,
                  width: 100,
                  quality: 60,
                })
              : 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg',
        }}
        resizeMode="cover"
        style={[styles.image, {borderRadius: rounded ? 100 : 0}]}
      />
    </View>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH > 800 ? SCREEN_WIDTH / 10 : SCREEN_WIDTH / 6,
    // overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    // borderWidth: 1,
    // borderColor: Colors.border,
  },
});
