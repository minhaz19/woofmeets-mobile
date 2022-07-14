import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import {Switch} from './Switch';

const SwitchView = (props: {
  isActive: boolean | null | undefined;
  onSelect: ((...args: any[]) => any) | null | undefined;
  activeText: string | null | undefined;
  inActiveText: string | null | undefined;
}) => {
  return (
    <View>
      <Switch
        value={props.isActive}
        onValueChange={props.onSelect}
        activeText={props.activeText}
        inActiveText={props.inActiveText}
        circleSize={18}
        switchWidthMultiplier={3.4}
        switchBorderRadius={30}
        backgroundActive="#FFF2E9"
        backgroundInactive="#D9D9D9"
        circleActiveColor={'#FF7C38'}
        circleInActiveColor={Colors.light.text}
        innerCircleStyle={styles.innerCircleStyle}
        barHeight={24}
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
