import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppSwitch from '../../../common/AppSwitch';
interface Props {
  title: string;

  name: string;
}
const FilterSwitch = ({title, name}: Props) => {
  return (
    <View style={styles.container}>
      <AppSwitch name={name} title={title} />
    </View>
  );
};

export default FilterSwitch;
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});
