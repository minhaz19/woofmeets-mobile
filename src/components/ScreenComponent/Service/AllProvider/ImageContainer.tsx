/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import ShortText from '../../../common/text/ShortText';
import {DogFeet} from '../../../../assets/svgs/SVG_LOGOS';
import Colors from '../../../../constants/Colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Text_Size from '../../../../constants/textScaling';
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
          height: rounded
            ? SCREEN_WIDTH > 800
              ? SCREEN_WIDTH / 10
              : SCREEN_WIDTH / 8
            : SCREEN_HEIGHT / 10,
        },
      ]}>
      <Image
        source={{
          uri:
            provider?.user.image !== null
              ? provider?.user?.image?.url
              : 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg',
        }}
        resizeMode="cover"
        style={[styles.image, {borderRadius: rounded ? 100 : 50}]}
      />
      {provider?.backGroundCheck !== 'NONE' && (
        <View
          style={[
            styles.batchContainer,
            {
              backgroundColor: Colors.yellow,
            },
          ]}>
          <DogFeet />
          <ShortText
            textStyle={{color: Colors.text, fontSize: Text_Size.Text_10}}
            text="Verified"
          />
        </View>
      )}
    </View>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH > 800 ? SCREEN_WIDTH / 10 : SCREEN_WIDTH / 6,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  batchContainer: {
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 5,
  },
});
