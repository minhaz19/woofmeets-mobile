import {View, TextInput, StyleSheet, TextStyle, KeyboardTypeOptions} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderText from '../text/HeaderText';
import DescriptionText from '../text/DescriptionText';

const screen = SCREEN_WIDTH;
const InputText = (props: {
  title?:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  placeholder: string | undefined;
  value: string | undefined;
  setValue: (arg0: string) => void;
  icon?: any;
  leftIcon?: any;
  style?: TextStyle;
  description?: string;
  keyboardType?: KeyboardTypeOptions;
  ref?: any;
  onChangeText?: (arg0: string) => void;
}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.zipContainer, {...props.style}]}>
      {props.title && <HeaderText text={props.title} />}
      {props.description && (
        <DescriptionText
          text={props.description}
          textStyle={styles.descriptionText}
        />
      )}
      <View
        style={[styles._input, {backgroundColor: colors.lightBackgroundColor}]}>
        <View style={styles.iconView}>{props.leftIcon}</View>
        <TextInput
          onChangeText={props.onChangeText ? props.onChangeText : pCode => props.setValue(pCode)}
          style={[styles.text, {color: colors.headerText}]}
          placeholderTextColor={colors.placeholderTextColor}
          {...props}
        />
        {props.icon && (
          <MaterialCommunityIcons
            name="chevron-right"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
            style={styles.iconStyle}
            color={Colors.subText}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  _input: {
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    width: '100%',
    height: 40,
    paddingVertical: screen > 390 ? -10 : 0,
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 2,
  },
  text: {
    fontSize: Text_Size.Text_8,
    flex: 1,
  },
  zipText: {
    fontSize: Text_Size.Text_8,
  },
  zipContainer: {
    paddingTop: '2%',
  },
  iconStyle: {
    paddingRight: 0,
    transform: [{rotate: '90deg'}],
  },
  descriptionText: {
    paddingVertical: '2%',
    lineHeight: 20,
  },
  iconView: {
    paddingRight: 10,
  },
});

export default InputText;
