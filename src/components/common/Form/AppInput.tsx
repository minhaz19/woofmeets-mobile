/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Text_Size from '../../../constants/textScaling';
import {Check, EyeClose, EyeOpen} from '../../../assets/SVG_LOGOS';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
const AppInput = ({...otherProps}) => {
  const [show, setShow] = useState(true);
  const {colors} = useTheme();
  const {numberOfLines} = otherProps;

  return (
    <View style={[styles.container]}>
      <TextInput
        placeholderTextColor={'gray'}
        style={[
          styles.text,
          {
            alignSelf: numberOfLines >= 2 ? 'flex-start' : 'center',
            height: numberOfLines >= 10 ? 120 : 44,

            flex: 1,
            color: colors.headerText,
          },
        ]}
        {...otherProps}
        secureTextEntry={otherProps.secureTextEntry ? show : false}
      />
      {!otherProps.secureTextEntry &&
      otherProps.error === undefined &&
      otherProps.touch
        ? otherProps.email && (
            <View style={styles.check}>
              <Check size={20} />
            </View>
          )
        : null}
      {otherProps.secureTextEntry &&
        (show ? (
          <EyeClose
            size={20}
            onPress={() => setShow(!show)}
            fill={colors.descriptionText}
          />
        ) : (
          <EyeOpen
            size={20}
            onPress={() => setShow(!show)}
            fill={colors.descriptionText}
          />
        ))}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    justifyContent: 'center',
  },
  text: {
    width: '90%',
    fontSize: Text_Size.Text_1,
    flex: 0,
  },
  check: {height: '100%', alignSelf: 'center'},
});
