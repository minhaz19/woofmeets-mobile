import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppSwitch from '../../../common/AppSwitch';
interface Props {
  title: string;
  active: boolean;
  name: string;
  onPress: () => void;
}
const FilterSwitch = ({title, name, active, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <AppSwitch name={name} title={title} active={active} onPress={onPress} />
    </View>
  );
};

export default FilterSwitch;
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});
