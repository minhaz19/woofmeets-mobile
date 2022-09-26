/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Text_Size from '../../../../constants/textScaling';
import { useTheme } from '../../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import BigText from '../../../common/text/BigText';
import DescriptionText from '../../../common/text/DescriptionText';
import HeaderText from '../../../common/text/HeaderText';

const Header = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <BigText text="Create Your Profile" textStyle={styles.bigText} />
      <HeaderText text="Photos" textStyle={styles.headerText} />
      <DescriptionText
        text={'Share more about you with pet parents'}
        textStyle={styles.titleText}
      />
      <DescriptionText
        text="Show pet parents you'll love their pets like they do by uploading welcoming and professional photos of yourself. The more photos the better! We recommend five to ten. Here's some guidelines for appropriate photos."
        textStyle={{...styles.descriptionText, color: colors.descriptionText}}
      />
      <DescriptionText
        text="Examples"
        textStyle={{fontSize: Text_Size.Text_9, color: colors.descriptionText}}
      />
      <View style={styles.imageContainer}>
        {imageData?.map((image: any) => {
          return (
            <View key={image.id} style={styles.imageSize}>
              <Image style={styles.image} source={{uri: image.src}} />
            </View>
          );
        })}
      </View>
      <View>
        {randomPoint?.map((data: any) => {
          return (
            <View
              key={data.id}
              style={{flexDirection: 'row', paddingVertical: 4}}>
              <HeaderText text={'\u2022'} />
              <DescriptionText
                text={data.text}
                textStyle={{flex: 1, paddingLeft: 5, color: colors.descriptionText}}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  bigText: {},
  headerText: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '2%' : '1%',
  },
  titleText: {
    fontWeight: '600',
  },
  descriptionText: {
    lineHeight: 20,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
  },
  imageContainer: {
    flexDirection: 'row',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '3%',
    justifyContent: 'space-between',
  },
  imageSize: {
    width: 100,
    height: 100,
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
});

export default Header;

const imageData = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhdCUyMGFuZCUyMGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1626735761613-a8d7a3cdfe10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhdCUyMGFuZCUyMGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNhdCUyMGFuZCUyMGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  },
];

const randomPoint = [
  {
    id: 1,
    text: 'Include several photos of yourself, even better if you’re interacting with pets.',
  },
  {
    id: 2,
    text: 'Prove your experience by including photos of the pets you’ve cared for.',
  },
  {
    id: 3,
    text: 'Hosting pets in your home? Add photos of spaces in and around your house.',
  },
];
