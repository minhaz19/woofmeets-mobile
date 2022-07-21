/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
const AppInputSelect = ({...otherProps}) => {
  const {colors, isDarkMode} = useTheme();
  const {numberOfLines} = otherProps;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? colors.lightBackgroundColor
            : colors.inputLightBg,
          borderColor: isDarkMode ? Colors.gray : Colors.border,
        },
      ]}>
      <TextInput
        editable={false}
        placeholderTextColor={'gray'}
        style={[
          styles.text,
          {
            alignSelf: numberOfLines >= 2 ? 'flex-start' : 'center',
            height: numberOfLines >= 10 ? 120 : 40,
            flex: 1,
            color: isDarkMode ? 'gray' : 'black',
          },
        ]}
        {...otherProps}
      />
      {otherProps.Icon ? <otherProps.Icon /> : null}
    </View>
  );
};

export default AppInputSelect;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1,

    flexWrap: 'wrap',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    justifyContent: 'center',
  },
  text: {
    width: '90%',
    fontSize: Text_Size.Text_9,
    flex: 0,
  },
  check: {height: '100%', alignSelf: 'center'},
});
