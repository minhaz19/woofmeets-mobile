import {StyleSheet, View, Switch} from 'react-native';
import React from 'react';

const SwitchView = (props: {
  isActive: boolean;
  onSelect: (...args: any[]) => any;
  activeText: string | null | undefined;
  inActiveText: string | null | undefined;
  inactiveColor?: string | undefined;
  activeColor?: string | undefined;
  inactiveTrackColor?: string | undefined;
  activeTrackColor?: string | undefined;
  iosBgColor: string | undefined;
}) => {
  return (
    <View>
      <Switch
        trackColor={{
          false: props?.inactiveTrackColor
            ? props?.inactiveTrackColor
            : '#D9D9D9',
          true: props?.activeTrackColor ? props?.activeTrackColor : '#FFF2E9',
        }}
        thumbColor={
          props.isActive
            ? props?.activeColor
              ? props?.activeColor
              : '#FF7C38'
            : props?.inactiveColor
            ? props?.inactiveColor
            : '#f4f3f4'
        }
        ios_backgroundColor={props?.iosBgColor ? props?.iosBgColor : '#D9D9D9'}
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
