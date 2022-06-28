import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Ant from 'react-native-vector-icons/AntDesign';
interface Props {
  name: string;
}
const Icon = ({name}: Props) => {
  return (
    <View style={styles.container}>
      <Ant size={20} name={name} color={'black'} />
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
});
