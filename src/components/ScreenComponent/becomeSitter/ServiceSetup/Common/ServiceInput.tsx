/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TextInput, View} from 'react-native';
import React, {memo} from 'react';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import ShortText from '../../../../common/text/ShortText';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Colors from '../../../../../constants/Colors';
import TitleText from '../../../../common/text/TitleText';

const ServiceInput = ({...otherProps}) => {
  const {isDarkMode, colors} = useTheme();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.rootContainer}>
        <View
          style={[
            styles.container,
            {
              borderColor: Colors.border,
              backgroundColor: otherProps.editable
                ? colors.backgroundColor
                : colors.borderColor,
            },
          ]}>
          <TitleText text={'$'} textStyle={{...styles.headerText}} />
          <TextInput
            style={[
              styles.text,
              {
                flex: 1,
                color: isDarkMode ? 'white' : 'black',
              },
            ]}
            {...otherProps}
          />
        </View>
        <TitleText text={'/night'} textStyle={{...styles.headerText}} />
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

export default memo(ServiceInput);

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    width: SCREEN_WIDTH <= 380 ? '50%' : SCREEN_WIDTH <= 600 ? '70%' : '30%',
    overflow: 'hidden',
  },
  icon: {
    marginRight: 10,
    justifyContent: 'center',
  },
  text: {
    height: 40,
    flex: 0,
    textAlign: 'right',
  },
  headerText: {
    paddingHorizontal: 5,
    fontWeight: '400',
    color: Colors.gray,
  },
  label: {},
  mainContainer: {
    marginBottom: 10,
  },
});
