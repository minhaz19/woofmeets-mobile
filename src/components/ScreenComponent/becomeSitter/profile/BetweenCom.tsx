import {View, StyleSheet} from 'react-native';
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
  };
}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        {props.data?.image && (
          <View style={styles.imageContainer}>{props.data.image}</View>
        )}
        <View style={styles.textContainer}>
          <HeaderText text={props.data.name} />
          <DescriptionText
            text={props.data.description}
            textStyle={{color: colors.descriptionText}}
          />
        </View>
      </View>
      <View style={styles.boxContainer}>
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
    </View>
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
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {},
  iconStyle: {paddingRight: 0},
});

export default BetweenCom;
