/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Text_Size from '../../../../../constants/textScaling';
import {Plus} from '../../../../../assets/SVG_LOGOS';
import ImageUploadModal from '../../../../UI/modal/ImageUploadModal';

const width = SCREEN_WIDTH;
const height = SCREEN_HEIGHT;
interface Props {
  dataList?: [
    {
      id: string;
    },
  ];
  onPress?: () => void;
}
const MyPetList = ({dataList, onPress}: Props) => {
  const handlePress = () => {};
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {dataList ? (
          <View>
            <Image
              source={require('../../../../../assets/image/pet/mypet.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Snoopy</Text>
              <Text style={styles.subTitle}>Cat</Text>
              <Text style={styles.description}>2 Years - Male</Text>
            </View>
          </View>
        ) : (
          <View style={styles.addPet}>
            <Plus />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MyPetList;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: height / 3.6,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#0000000A',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#0000000A',
  },

  image: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  title: {fontSize: Text_Size.Text_1, fontWeight: '600'},
  subTitle: {fontSize: Text_Size.Text_1},
  description: {fontSize: Text_Size.Text_0},
  addPet: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
