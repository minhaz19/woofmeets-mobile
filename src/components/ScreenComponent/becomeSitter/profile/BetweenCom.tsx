import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import TitleText from '../../../common/text/TitleText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';

const BetweenCom = (props: {
  data: {
    image?:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
    name: string;
    description: string;
    time: string;
    icon: string;
    screen?: () => {} | void;
  };
}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={styles.container} onPress={props.data.screen}>
      <View style={styles.boxContainer}>
        {props.data?.image && (
          <View style={styles.imageContainer}>{props.data.image}</View>
        )}
        <View style={styles.textContainer}>
          <HeaderText text={props.data.name} />
          <DescriptionText
            text={props.data.description}
            textStyle={{color: colors.descriptionText, paddingVertical: 2,}}
          />
        </View>
      </View>
      <View style={styles.boxContainerEnd}>
        <TitleText
          text={props.data.time}
          textStyle={{color: colors.descriptionText}}
        />
        <MaterialCommunityIcons
          name={props.data.icon}
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 28}
          style={styles.iconStyle}
          color={Colors.subText}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  boxContainerEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    // width: '70%',
  },
  iconStyle: {paddingRight: 0},
});

export default BetweenCom;
