/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../../../../constants/WindowSize';
import {DogFeet, ProfilePicSvg} from '../../../../../../assets/svgs/SVG_LOGOS';
import Colors from '../../../../../../constants/Colors';
import {useTheme} from '../../../../../../constants/theme/hooks/useTheme';
import {ProfileIcon} from '../../../../../../assets/svgs/Setting_SVG';
interface Props {
  image: string;
  rounded?: Boolean;
}
const ProviderImageContainer = ({image, rounded}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          height: SCREEN_WIDTH > 800 ? SCREEN_WIDTH / 7 : SCREEN_WIDTH / 5,
          borderColor: colors.borderColor,
        },
      ]}>
      <Image
        source={{
          uri: image
            ? image
            : 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg',
        }}
        resizeMode="cover"
        style={[styles.image, {borderRadius: rounded ? 100 : 50}]}
      />

      <View style={styles.batchCon}>
        <View style={styles.batchContainer}>
          <DogFeet fill={Colors.background} height={15} width={15} />
        </View>
      </View>
    </View>
  );
};

export default ProviderImageContainer;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH > 800 ? SCREEN_WIDTH / 7 : SCREEN_WIDTH / 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
  },
  batchCon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 22,
  },
  batchContainer: {
    marginTop: -19,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.primary,

    height: 22,
    width: 22,
    borderRadius: 100,
  },
});
