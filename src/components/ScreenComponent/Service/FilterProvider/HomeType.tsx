/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {colors} from '../../../../constants/theme/textTheme';
import ShortText from '../../../common/text/ShortText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
interface Props {
  Icon: any;
  selected: string;
  onPress?: () => void;
  text: string;
  slug: string;
}
const HomeType = ({Icon, text, onPress, selected, slug}: Props) => {
  const {isDarkMode} = useTheme();
  return (
    <AppTouchableOpacity style={styles.homeTypeContainer} onPress={onPress}>
      <View
        style={[
          styles.container,
          {borderColor: slug === selected ? Colors.primary : Colors.border},
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
          slug === selected
              ? Colors.primary
              : isDarkMode
              ? Colors.background
              : Colors.headerText,
        }}
        text={text}
      />
    </AppTouchableOpacity>
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
    marginBottom: 10,
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
