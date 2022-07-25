import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RoundedCheckboxFilled} from '../../../../assets/SVG_LOGOS';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
interface Props {
  image: any;
  name: string;
  index: number;
  selected: number;
  onPress?: () => void;
}
const ConsumerPetList = ({image, name, onPress, index, selected}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <View style={styles.imageCon}>
          <Image source={image} style={styles.image} />
          {index === selected && (
            <View style={styles.batchContainer}>
              <RoundedCheckboxFilled />
            </View>
          )}
        </View>
        <TitleText textStyle={{fontSize: Text_Size.Text_0}} text={name} />
      </View>
    </TouchableOpacity>
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
  imageCon: {
    width: 50,
    height: 50,
    marginRight: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    marginRight: 10,
  },
  batchContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
  },
});
