import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC, useState} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';

interface Props {
  hText: string;
  dText: string;
}

const ServiceLocation: FC<Props> = ({hText, dText}) => {
  const colors = useTheme();
  const [text, setText] = useState('');
  const onChangeText = () => setText(text);
  return (
    <View>
      <Text style={[styles.headerText, {color: colors.colors.headerText}]}>
        {hText}
      </Text>
      <TextInput
        style={[styles.input, {backgroundColor: colors.colors.backgroundColor}]}
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter your location"
      />
    </View>
  );
};

export default ServiceLocation;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
