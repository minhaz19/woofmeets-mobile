import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';

const PendingMessage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../assets/image/pet/mypet.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View>
          <HeaderText text="Steve Goodman" textStyle={styles.textHeader} />
          <DescriptionText
            text="Steve Goodman"
            textStyle={styles.textDescription}
          />
          <DescriptionText
            text="Steve Goodman"
            textStyle={styles.textDescription}
          />
        </View>
        <View>
          <DescriptionText
            text="Steve Goodman"
            textStyle={styles.textDescription}
          />
        </View>
      </View>
    </View>
  );
};

export default PendingMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '5%' : '2%',
  },
  image: {
    borderRadius: 100,
    width: SCREEN_WIDTH <= 380 ? 30 : SCREEN_WIDTH <= 600 ? 30 : 40,
    height: SCREEN_WIDTH <= 380 ? 30 : SCREEN_WIDTH <= 600 ? 30 : 40,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  imageContainer: {
    width: SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 30 : 40,
  },
});
