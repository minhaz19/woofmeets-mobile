/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  data: any;
  noShadow?: boolean;
  sequence: number;
  onPressEvent: (id: number) => void;
}

const ReusableServices: FC<Props> = props => {
  const {colors} = useTheme();
  const getIcon = (iconId: number, selected: boolean) => {
    switch (iconId) {
      case 1:
        return (
          <FontAwesome5Icon
            name="briefcase"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={selected ? 'white' : Colors.primary}
          />
        );
      case 2:
        return (
          <FontAwesome5Icon
            name="home"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={selected ? 'white' : Colors.primary}
          />
        );
      case 3:
        return (
          <FontAwesome5Icon
            name="house-user"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={selected ? 'white' : Colors.primary}
          />
        );
      case 4:
        return (
          <MaterialCommunityIcons
            name="dog-service"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={selected ? 'white' : Colors.primary}
          />
        );
      case 5:
        return (
          <FontAwesome5Icon
            name="paw"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={selected ? 'white' : Colors.primary}
          />
        );
    }
  };
  return (
    <TouchableOpacity onPress={() => props.onPressEvent(props.data.sequence)}>
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
            height: 'auto',
          },
        ]}>
        <View style={styles.boxContainer}>
          <View style={styles.imageContainer}>
            {getIcon(
              props.data.sequence,
              props.sequence === props.data.sequence,
            )}
          </View>
          <View style={styles.textContainer}>
            <HeaderText
              text={props.data.name}
              textStyle={{
                color:
                  props.sequence === props.data.sequence
                    ? 'white'
                    : colors.headerText,
                fontWeight:
                  props.sequence === props.data.sequence ? '800' : '500',
              }}
            />
            <DescriptionText
              text={props.data.description}
              textStyle={{
                ...styles.description,
                color:
                  props.sequence === props.data.sequence
                    ? 'white'
                    : colors.descriptionText,
              }}
            />
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
    minHeight: 160,
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
