import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../../constants/textScaling';

interface Props {
  title: string;
  subTitle: string;
  image: any;
}
const AuthHeader = ({image, title, subTitle}: Props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode="contain" source={image} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  image: {width: 100, height: 100, marginTop: '0%'},
  title: {
    fontSize: Text_Size.Text_2,
    fontWeight: '600',
    marginTop: '3%',
  },
  subTitle: {
    marginTop: '2%',
    fontSize: Text_Size.Text_0,
  },
});
