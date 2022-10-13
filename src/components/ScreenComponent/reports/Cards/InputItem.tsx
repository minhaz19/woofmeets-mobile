/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import TitleText from '../../../common/text/TitleText';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';

interface Props {
  data: any;
  noShadow?: boolean;
  sequence: number;
  onPressEvent: (id: number) => void;
  divide?: number;
  icon?: any;
}

const InputItem: FC<Props> = props => {
  const {colors} = useTheme();
  return (
    <AppTouchableOpacity
      onPress={() => {
        props.onPressEvent(props.data);
        // props.data.onPress;
      }}
      key={props.data.id}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
            borderWidth: props.sequence === props.data.sequence ? 2 : 2,
            borderColor:
              props.sequence === props.data.sequence
                ? Colors.primary
                : colors.borderColor,
            width: props.divide ? SCREEN_WIDTH / 2 - 24 : SCREEN_WIDTH / 4 - 16,
            height: 'auto',
          },
        ]}>
        <View style={[styles.boxContainer, props.divide ? styles.pet : {}]}>
          <View style={styles.imageContainer}>
            {props.data.icon}
          </View>
          <View style={[styles.textContainer]}>
            <TitleText text={props.data.name} textStyle={styles.textStyle} />
          </View>
        </View>
        {props.sequence === props.data.sequence && (
          <View style={styles.rightSelection} />
        )}
      </View>
    </AppTouchableOpacity>
  );
};

export default InputItem;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.subText,
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 10,
  },
  boxContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    paddingBottom: 10,
  },
  image: {},
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    minHeight: 40,
    justifyContent: 'center',
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
  },
  pet: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: '500',
    textAlign: 'center',
  },
});
