/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {DogIcon, DogWalkingIcon} from '../../../assets/svgs/Services_SVG';
import TitleText from '../../common/text/TitleText';
import AppTouchableOpacity from '../../common/AppClickEvents/AppTouchableOpacity';

interface Props {
  data: any;
  noShadow?: boolean;
  onPressEvent: (id: number) => void;
  divide?: number;
}

const PetCard: FC<Props> = props => {
  const {colors} = useTheme();
  const getIcon = (iconId: number) => {
    switch (iconId) {
      case 1:
        return <DogIcon width={32} height={34} />;
      case 2:
        return <DogIcon width={32} height={34} />;
    }
  };

  return (
    <AppTouchableOpacity
      onPress={() => {
        props.onPressEvent(props.data.id);
        // props.data.onPress;
      }}
      key={props.data.id}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
            borderWidth: props.data.selected ? 2 : 2,
            borderColor:
              props.data.selected
                ? Colors.primary
                : colors.borderColor,
            width: props.divide ? SCREEN_WIDTH / 2 - 24 : SCREEN_WIDTH / 3 - 20,
            height: 'auto',
          },
        ]}>
        <View style={[styles.boxContainer, props.divide ? styles.pet : {}]}>
          {props.data.icon && (
            <View style={styles.imageContainer}>
              {getIcon(props.data.sequence)}
            </View>
          )}
          <View style={[styles.textContainer]}>
            <TitleText text={props.data.name} textStyle={styles.textStyle} />
          </View>
        </View>
        {props.data.selected && (
          <View style={styles.rightSelection} />
        )}
      </View>
    </AppTouchableOpacity>
  );
};

export default PetCard;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.subText,
    marginBottom: 10,
    marginRight: 10,
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
