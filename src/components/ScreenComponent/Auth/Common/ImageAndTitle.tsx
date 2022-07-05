import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../../constants/textScaling';

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
        <Text style={styles.title}>{title}</Text>
        {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
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
