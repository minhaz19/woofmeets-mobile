/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import HeaderText from '../../common/text/HeaderText';
import DescriptionText from '../../common/text/DescriptionText';
import Colors from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {
  BoardingIcon,
  DoggyDayCareIcon,
  DogWalkingIcon,
  DropInVisitIcon,
  HouseSittingIcon,
} from '../../../assets/svgs/Services_SVG';
import TitleText from '../../common/text/TitleText';
import ShortText from '../../common/text/ShortText';

interface Props {
  data: any;
  noShadow?: boolean;
  sequence: number;
  onPressEvent: (id: number) => void;
  divide?: number;
}

const ServiceCard: FC<Props> = props => {
  const {colors} = useTheme();
  const getIcon = (iconId: number) => {
    switch (iconId) {
      case 1:
        return <BoardingIcon width={34} height={36} />;
      case 2:
        return <HouseSittingIcon width={34} height={36} />;
      case 3:
        return <DropInVisitIcon width={34} height={36} />;
      case 4:
        return <DoggyDayCareIcon width={34} height={36} />;
      case 5:
        return <DogWalkingIcon width={34} height={36} />;
      case 6:
        return <DogWalkingIcon width={34} height={36} />;
      case 7:
        return <DogWalkingIcon width={34} height={36} />;
    }
  };
  return (
    <TouchableOpacity onPress={() => props.onPressEvent(props.data.sequence)}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
            borderWidth: props.sequence === props.data.sequence ? 2 : 1,
            borderColor:
              props.sequence === props.data.sequence
                ? Colors.primary
                : colors.borderColor,
            width: props.divide ? SCREEN_WIDTH / 2  - 20 : SCREEN_WIDTH / 3  - 20,
          },
        ]}>
        <View style={[styles.boxContainer, props.divide ? styles.pet : {}]}>
          <View style={styles.imageContainer}>
            {getIcon(props.data.sequence)}
          </View>
          <View style={[styles.textContainer]}>
            <ShortText text={props.data.name} textStyle={styles.textStyle} />
          </View>
        </View>
        {props.sequence === props.data.sequence && (
          <View style={styles.rightSelection} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.subText,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
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
    paddingHorizontal: 10,
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
    alignItems: 'center'
  },
  textStyle: {
    fontWeight: '500',
  },
});
