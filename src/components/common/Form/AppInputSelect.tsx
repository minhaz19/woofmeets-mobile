/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
const AppInputSelect = ({...otherProps}) => {
  const {colors, isDarkMode} = useTheme();
  const {numberOfLines} = otherProps;
  return (
    <TouchableOpacity
      onPress={otherProps.onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: Colors.border,
        },
      ]}>
      <TextInput
        editable={false}
        placeholderTextColor={Colors.gray}
        onPressIn={otherProps.onPress}
        style={[
          styles.text,
          {
            alignSelf: numberOfLines >= 2 ? 'flex-start' : 'center',
            height: numberOfLines >= 10 ? 120 : 40,
            flex: 1,
            color: Colors.black,
          },
        ]}
        {...otherProps}
      />
      {otherProps.Icon
        ? otherProps.value !== '' && (
            <TouchableOpacity
              style={styles.icon}
              activeOpacity={1}
              onPress={otherProps.onPressCross}>
              <otherProps.Icon />
            </TouchableOpacity>
          )
        : null}
    </TouchableOpacity>
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
    padding: 5,
    paddingLeft: 10,
    // backgroundColor: 'red',
  },
  text: {
    width: '90%',
    fontSize: Text_Size.Text_11,
    fontFamily: 'Muli',
    flex: 0,
  },
  check: {height: '100%', alignSelf: 'center'},
});
