import {StyleSheet, View, Switch} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';

const SwitchView = (props: {
  isActive: boolean;
  onSelect: (...args: any[]) => any;
  activeText: string | null | undefined;
  inActiveText: string | null | undefined;
}) => {
  return (
    <View>
      <Switch
        trackColor={{false: '#D9D9D9', true: '#FFF2E9'}}
        thumbColor={props.isActive ? '#FF7C38' : '#f4f3f4'}
        ios_backgroundColor="#D9D9D9"
        onValueChange={props.onSelect}
        value={props.isActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  innerCircleStyle: {
    padding: 5,
    borderWidth: 2.5,
    borderRadius: 10,
    borderColor: 'white',
  },
});

export default SwitchView;
