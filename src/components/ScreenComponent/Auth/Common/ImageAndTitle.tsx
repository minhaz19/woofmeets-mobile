/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../../constants/textScaling';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
interface Props {
  id?: number;
  Icon?: any;
  title: string;
  subTitle?: string;
  image?: any;
  rowImage?: boolean;
}
const ImageAndTitle = ({id, title, Icon, subTitle, image, rowImage}: Props) => {
  return (
    <View
      key={id}
      style={{
        flexDirection: rowImage ? 'row' : 'column',
        alignItems: 'center',
        width: '80%',
      }}>
      <View style={styles.iconContainer}>
        {Icon && (
          <Icon
            width={SCREEN_WIDTH > 800 ? 200 : 180}
            height={SCREEN_WIDTH > 800 ? 200 : 180}
          />
        )}
        {image && (
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.textContainer}>
        <TitleText textStyle={styles.title} text={title} />
        {subTitle && (
          <DescriptionText textStyle={styles.subTitle} text={subTitle} />
        )}
      </View>
    </View>
  );
};

export default ImageAndTitle;

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
  },
  iconContainer: {alignItems: 'center'},
  title: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  subTitle: {
    fontSize: Text_Size.Text_0,
    textAlign: 'center',
    marginTop: '5%',
  },
  image: {
    flex: 0,
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
});
