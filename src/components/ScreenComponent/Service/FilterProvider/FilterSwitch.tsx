import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppSwitch from '../../../common/AppSwitch';
interface Props {
  title: string;
  //   heading: string;
}
const FilterSwitch = ({title}: Props) => {
  return (
    <View>
      <AppSwitch name="s" title={title} />
    </View>
  );
};

export default FilterSwitch;

const styles = StyleSheet.create({});
