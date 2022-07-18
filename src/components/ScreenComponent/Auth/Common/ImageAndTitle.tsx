import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../../constants/textScaling';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';

interface Props {
  image: any;
  title: string;
  subTitle?: string;
}
const ImageAndTitle = ({image, title, subTitle}: Props) => {
  return (
    <View>
      <View>
        <Image style={styles.image} resizeMode="contain" source={image} />
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
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
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
});
