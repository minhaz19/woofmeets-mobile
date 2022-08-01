import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import ShortText from '../../../common/text/ShortText';
import {DogFeet} from '../../../../assets/SVG_LOGOS';
import Colors from '../../../../constants/Colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';
interface Props {
  image: string;
}
const ImageContainer = ({image}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} resizeMode="contain" style={styles.image} />
      {/* <Image source={image} resizeMode="contain" style={styles.image} /> */}
      <View style={styles.batchContainer}>
        <DogFeet />
        <ShortText textStyle={{color: Colors.text}} text="Verified" />
      </View>
    </View>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 6,
    height: SCREEN_HEIGHT / 8.5,
  },
  image: {width: '100%', height: '100%', borderRadius: 50},
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
