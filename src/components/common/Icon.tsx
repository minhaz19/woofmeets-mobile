import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Ant from 'react-native-vector-icons/AntDesign';
interface Props {
  name?: string;
  IconComp?: any;
}
const Icon = ({name, IconComp}: Props) => {
  return (
    <View style={styles.container}>
      {name && <Ant size={20} name={name} color={'black'} />}
      {IconComp && <IconComp />}
    </View>
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
