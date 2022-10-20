/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
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
import AppTouchableOpacity from '../../common/AppClickEvents/AppTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  data: any;
  noShadow?: boolean;
  sequence: number;
  onPressEvent: (id: number) => void;
  divide?: number;
}

const ServiceCard: FC<Props> = props => {
  const {colors} = useTheme();
  const getIcon = (iconId: number, selected: boolean) => {
    switch (iconId) {
      // case 1:
      //   return <BoardingIcon width={34} height={36} />;
      // case 2:
      //   return <HouseSittingIcon width={34} height={36} />;
      // case 3:
      //   return <DropInVisitIcon width={34} height={36} />;
      // case 4:
      //   return <DoggyDayCareIcon width={34} height={36} />;
      // case 5:
      //   return <DogWalkingIcon width={34} height={36} />;
      case 1:
        return <FontAwesome5Icon
        name="briefcase"
        size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
        color={selected ? 'white' : Colors.primary}/>;
      case 2:
        return <FontAwesome5Icon
          name="home"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
          color={selected ? 'white' : Colors.primary}/>;
      case 3:
        return <FontAwesome5Icon
          name="house-user"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
          color={selected ? 'white' : Colors.primary}/>;
      case 4:
        return <MaterialCommunityIcons
          name="dog-service"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
          color={selected ? 'white' : Colors.primary}/>;
      case 5:
        return <FontAwesome5Icon
          name="paw"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
          color={selected ? 'white' : Colors.primary}/>;
    }
  };
  return (
    <AppTouchableOpacity
      onPress={() => {
        props.onPressEvent(props.data);
      }}
      key={props.data.id}>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              props.sequence === props.data.sequence
                ? Colors.primary
                : colors.backgroundColor,
            borderWidth: props.sequence === props.data.sequence ? 2 : 2,
            borderColor:
              props.sequence === props.data.sequence
                ? Colors.primary
                : colors.borderColor,
            width: props.divide ? SCREEN_WIDTH / 2 - 24 : SCREEN_WIDTH / 3 - 20,
            height: 'auto',
          },
        ]}>
        <View style={[styles.boxContainer, props.divide ? styles.pet : {}]}>
          <View style={styles.imageContainer}>
            {getIcon(props.data.sequence, props.sequence === props.data.sequence)}
          </View>
          <View style={[styles.textContainer]}>
            <TitleText
              text={props.data.name}
              textStyle={{
                ...styles.textStyle,
                color:
                  props.sequence === props.data.sequence ? 'white' : colors.headerText,
                fontWeight:
                  props.sequence === props.data.sequence ? '800' : '500',
              }}
            />
          </View>
        </View>
        {props.sequence === props.data.sequence && (
          <View style={styles.rightSelection} />
        )}
      </View>
    </AppTouchableOpacity>
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
  },
  boxContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    paddingBottom: 5,
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
