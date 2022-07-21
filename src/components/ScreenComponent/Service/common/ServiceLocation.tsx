/* eslint-disable prettier/prettier */
import {StyleSheet, TextInput, View, Pressable} from 'react-native';
import React, {FC, useState} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Text_Size from '../../../../constants/textScaling';
import Ion from 'react-native-vector-icons/Ionicons';
import Colors from '../../../../constants/Colors';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';

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
      <HeaderText textStyle={styles.headerText} text={hText} />
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
            placeholderTextColor={colors.colors.placeholderTextColor}
          />
          <Ion
            name="chevron-forward-outline"
            size={18}
            color={colors.colors.descriptionText}
          />
        </View>
      </Pressable>
      <DescriptionText text={dText} />
    </>
  );
};

export default ServiceLocation;

const styles = StyleSheet.create({
  headerText: {
    fontSize: Text_Size.Text_9,
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
  },
});
