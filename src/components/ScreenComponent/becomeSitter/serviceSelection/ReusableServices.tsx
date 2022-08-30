/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity, GestureResponderEvent} from 'react-native';
import React, {FC} from 'react';
import { useTheme } from '../../../../constants/theme/hooks/useTheme';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import Colors from '../../../../constants/Colors';
import { SCREEN_WIDTH } from '../../../../constants/WindowSize';

interface Props {
  data: any;
  noShadow?: boolean;
  onPressEvent: ((id: number) => void);
}

const ReusableServices: FC<Props> = data => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={() => data.onPressEvent(data.data.id - 1)}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
            borderWidth: 1,
            borderColor: data.data.clicked ? Colors.primary : colors.borderColor,
          },
        ]}>
        <View style={styles.boxContainer}>
          <View style={styles.imageContainer}>{data.data.image}</View>
          <View style={styles.textContainer}>
            <HeaderText text={data.data.name} />
            <DescriptionText text={data.data.description} textStyle={styles.description} />
            <DescriptionText text={data.data.price} textStyle={styles.description} />
          </View>
        </View>
        {data.data.clicked && <View style={styles.rightSelection} />}
      </View>
    </TouchableOpacity>
  );
};

export default ReusableServices;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.subText,
    width: SCREEN_WIDTH / 2 - 30,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 5,
    paddingVertical: 10,
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    alignItems: 'center',
    width: '100%'
  },
  imageContainer: {
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
  },
  description: {
    paddingVertical: 6,
    textAlign: 'center',
  },
  rightSelection: {
    height: 8,
    width: 8,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
    position: 'absolute',
    right: 10,
    top: 10,
  }
});
