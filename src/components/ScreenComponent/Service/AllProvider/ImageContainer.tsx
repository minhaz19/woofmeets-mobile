import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import ShortText from '../../../common/text/ShortText';
import {DogFeet} from '../../../../assets/SVG_LOGOS';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {ScreenHeight} from 'react-native-elements/dist/helpers';
interface Props {
  image: any;
}
const ImageContainer = ({image}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={image} resizeMode="contain" style={styles.image} />
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
    height: ScreenHeight / 8.5,
  },
  image: {width: '100%', height: '100%'},
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
