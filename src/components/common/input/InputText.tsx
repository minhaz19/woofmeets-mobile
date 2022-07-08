import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const InputText = (props: {
  title:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  placeholder: string | undefined;
  value: string | undefined;
  setValue: (arg0: string) => void;
}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.zipContainer}>
      <Text style={[styles.zipText, {color: colors.headerText}]}>
        {props.title}
      </Text>
      <TextInput
        onChangeText={pCode => props.setValue(pCode)}
        style={[styles._input, {color: colors.headerText}]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  _input: {
    width: '100%',
    height: 35,
    fontSize: Text_Size.Text_1,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    marginVertical: 6,
  },
  zipText: {
    fontSize: Text_Size.Text_1,
    fontWeight: '500',
  },
  zipContainer: {
    paddingTop: '2%',
  },
});

export default InputText;
