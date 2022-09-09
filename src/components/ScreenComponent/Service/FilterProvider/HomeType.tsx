/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {colors} from '../../../../constants/theme/textTheme';
import ShortText from '../../../common/text/ShortText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
interface Props {
  Icon: any;
  index: number;
  selected: number;
  onPress?: () => void;
  text: string;
}
const HomeType = ({Icon, text, index, onPress, selected}: Props) => {
  const {isDarkMode} = useTheme();
  return (
    <TouchableOpacity style={styles.homeTypeContainer} onPress={onPress}>
      <View
        style={[
          styles.container,
          {borderColor: index === selected ? Colors.primary : Colors.border},
        ]}>
        <Icon
          height={30}
          width={30}
          fill={isDarkMode ? colors.backgroundColor : colors.headerText}
        />
      </View>
      <ShortText
        textStyle={{
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 10,
          color:
            index === selected
              ? Colors.primary
              : isDarkMode
              ? Colors.background
              : Colors.headerText,
        }}
        text={text}
      />
    </TouchableOpacity>
  );
};

export default HomeType;

const styles = StyleSheet.create({
  homeTypeContainer: {
    width:
      SCREEN_WIDTH > 800
        ? SCREEN_WIDTH / 3 - (SCREEN_WIDTH / 100) * 15
        : SCREEN_WIDTH / 3 - 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginVertical: 20,
  },
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,

    padding: SCREEN_WIDTH > 800 ? 30 : 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {},
});
