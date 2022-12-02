import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../../constants/textScaling';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';
interface Props {
  title: string;
  subTitle: string;
  image?: any;
}
const AuthHeader = ({image, title, subTitle}: Props) => {
  return (
    <View style={styles.container}>
      {image && (
        <Image style={styles.image} resizeMode="contain" source={image} />
      )}
      <View>
        <TitleText textStyle={styles.title} text={title} />
        <DescriptionText textStyle={styles.subTitle} text={subTitle} />
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  image: {width: 100, height: 100, marginTop: '0%', borderRadius: 50},
  title: {
    fontSize: Text_Size.Text_2,
    fontWeight: '600',
    marginTop: '3%',
  },
  subTitle: {
    marginTop: '3%',
    fontSize: Text_Size.Text_0,
  },
});
