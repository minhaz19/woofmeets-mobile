/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {
  BoardingIcon,
  DoggyDayCareIcon,
  DogWalkingIcon,
  DropInVisitIcon,
  HouseSittingIcon,
} from '../../../../assets/svgs/Services_SVG';

interface Props {
  data: any;
  noShadow?: boolean;
  sequence: number;
  onPressEvent: (id: number) => void;
}

const ReusableServices: FC<Props> = props => {
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
    }
  };
  return (
    <TouchableOpacity onPress={() => props.onPressEvent(props.data.sequence)}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
            borderWidth: props.sequence === props.data.sequence ? 3 : 1,
            borderColor:
              props.sequence === props.data.sequence
                ? Colors.primary
                : colors.borderColor,
          },
        ]}>
        <View style={styles.boxContainer}>
          <View style={styles.imageContainer}>
            {getIcon(props.data.sequence)}
          </View>
          <View style={styles.textContainer}>
            <HeaderText text={props.data.name} />
            <DescriptionText
              text={props.data.description}
              textStyle={styles.description}
            />
            {/* <DescriptionText
              text={props.data.price}
              textStyle={styles.description}
            /> */}
          </View>
        </View>
        {props.sequence === props.data.sequence && (
          <View style={styles.rightSelection} />
        )}
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
    minHeight: 180,
    // height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    alignItems: 'center',
    width: '100%',
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
    paddingHorizontal: 4,
  },
  rightSelection: {
    height: 12,
    width: 12,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 4,
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
