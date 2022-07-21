import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {RoundedCheckbox} from '../../../../assets/SVG_LOGOS';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
interface Props {
  image: any;
  name: string;
}
const ConsumerPetList = ({image, name}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        <TitleText textStyle={{fontSize: Text_Size.Text_0}} text={name} />
      </View>
      <View>
        <RoundedCheckbox />
      </View>
    </View>
  );
};

export default ConsumerPetList;

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    marginVertical: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
