/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TextInput, View, Pressable} from 'react-native';
import React, {FC, useState} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Text_Size from '../../../../constants/textScaling';
import Ion from 'react-native-vector-icons/Ionicons';
import Colors from '../../../../constants/Colors';

interface Props {
  hText: string;
  dText: string;
}
const screen = SCREEN_WIDTH;
const ServiceLocation: FC<Props> = ({hText, dText}) => {
  const [show, setShow] = useState(true);
  const colors = useTheme();

  return (
    <>
      <Text style={[styles.headerText, {color: colors.colors.headerText}]}>
        {hText}
      </Text>
      <Pressable onPress={() => setShow(!show)}>
        <View
          pointerEvents="none"
          style={[
            styles.container,
            {backgroundColor: colors.colors.backgroundColor},
          ]}>
          <TextInput
            style={[styles.text, {color: colors.colors.placeholderTextColor}]}
            placeholder="Select your location"
          />
          <Ion
            name="chevron-forward-outline"
            size={24}
            style={{paddingRight: 10}}
            color={colors.colors.headerText}
          />
        </View>
      </Pressable>
      <Text style={[styles.text, {color: colors.colors.descriptionText}]}>
        {dText}
      </Text>
    </>
  );
};

export default ServiceLocation;

const styles = StyleSheet.create({
  headerText: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  container: {
    borderRadius: 5,
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
  },
  text: {
    fontSize: Text_Size.Text_0,
    flex: 0,
    color: 'black',
  },
});
