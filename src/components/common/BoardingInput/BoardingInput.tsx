/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ShortText from '../text/ShortText';
import HeaderText from '../text/HeaderText';

const BoardingInput = ({...otherProps}) => {
  const {colors, isDarkMode} = useTheme();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.rootContainer}>
        <View
          style={[
            styles.container,
            {
              borderColor: colors.headerText,
            },
          ]}>
          <HeaderText text={'$'} textStyle={{...styles.headerText}} />
          <TextInput
            //   placeholderTextColor={colors.placeholderTextColo
            style={[
              styles.text,
              {
                color: isDarkMode ? 'white' : 'black',
              },
            ]}
            {...otherProps}
          />
        </View>
        <HeaderText text={'/night'} textStyle={{...styles.headerText}} />
      </View>
      {!otherProps.icon ? (
        <ShortText
          textStyle={styles.label}
          text={`You will earn per service: $${otherProps.value}`}
        />
      ) : (
        <ShortText
          textStyle={styles.label}
          text={`You keep: $${otherProps.value}`}
        />
      )}
    </View>
  );
};

export default BoardingInput;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: Text_Size.Text_0,
    height: 40,
  },
  headerText: {
    paddingHorizontal: 5,
    fontWeight: '400',
  },
  label: {},
  mainContainer: {
    marginBottom: 10,
  },
});
