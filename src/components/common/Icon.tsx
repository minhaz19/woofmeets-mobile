import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import Ant from 'react-native-vector-icons/AntDesign';
interface Props {
  name?: string;
  image?: any;
}
const Icon = ({name, image}: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      {name && <Ant size={20} name={name} color={'black'} />}
      {image && (
        <Image source={image} style={styles.image} resizeMode="contain" />
      )}
    </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f4f4',
    borderRadius: 50,
  },
  image: {width: 30, height: 30},
});
