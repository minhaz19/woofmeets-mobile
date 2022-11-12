import {StyleSheet, View} from 'react-native';
import React from 'react';
import ShortText from '../../../common/text/ShortText';
import SwitchView from '../../../common/switch/SwitchView';
import Text_Size from '../../../../constants/textScaling';
interface Props {
  title?: string;
  isEnabled: boolean;
  onPress?: () => void;
}
const FilterSwitch = ({title, isEnabled, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <ShortText text={title} textStyle={styles.title} />
      <SwitchView
        isActive={isEnabled}
        activeText=""
        inActiveText=""
        onSelect={onPress}
      />
    </View>
  );
};

export default FilterSwitch;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  title: {
    fontSize: Text_Size.Text_0,
  },
});
