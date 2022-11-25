/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import ImageAndTitle from '../../../components/ScreenComponent/Auth/Common/ImageAndTitle';
import HeaderText from '../../../components/common/text/HeaderText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

interface Props {
  id: number;
  pee: number;
  poo: number;
  water: number;
  food: number;
  title?: string;
  image?: any;
}

const ReportSingleCard = ({pee, poo, water, food, title, image, id}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: colors.backgroundColor,
        marginBottom: 15,
      }}>
      <View style={styles.imageAndTitle}>
        <ImageAndTitle
          id={id}
          title={title ? title : 'title'}
          rowImage
          image={image}
        />
      </View>

      <View style={styles.innerContainer}>
        <MaterialIcons
          name="waterfall-chart"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
          color={Colors.primary}
          style={styles.iconStyle}
        />
        <HeaderText text={pee ? pee + ' pee breaks' : '0 pee breaks'} />
      </View>

      <View style={styles.innerContainer}>
        <MaterialCommunityIcons
          name="emoticon-poop"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
          color={Colors.primary}
          style={styles.iconStyle}
        />
        <HeaderText text={poo ? poo + ' poo breaks' : '0 poo breaks'} />
      </View>

      <View style={styles.innerContainer}>
        <MaterialCommunityIcons
          name="pot-mix-outline"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
          color={Colors.primary}
          style={styles.iconStyle}
        />
        <HeaderText text={food ? food + ' food breaks' : '0 food breaks'} />
      </View>

      <View style={styles.innerContainer}>
        <Entypo
          name="water"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
          color={Colors.primary}
          style={styles.iconStyle}
        />
        <HeaderText text={water ? water + ' water breaks' : '0 water breaks'} />
      </View>
    </View>
  );
};

export default ReportSingleCard;

const styles = StyleSheet.create({
  imageAndTitle: {
    paddingVertical: 6,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  iconStyle: {paddingHorizontal: 10},
});
