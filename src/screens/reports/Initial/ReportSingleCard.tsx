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
  Icon?: any;
  title: string;
  subTitle?: string;
  image?: any;
  rowImage?: boolean;
  isPeeSelected: any;
  isPooSelected: any;
  isFoodSelected: any;
  isWaterSelected: any;
}

const ReportSingleCard = ({
  id,
  title,
  image,
  isPeeSelected,
  isPooSelected,
  isFoodSelected,
  isWaterSelected,
}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: colors.backgroundColor,
        marginBottom: 15,
      }}>
      <View style={styles.imageAndTitle}>
        <ImageAndTitle id={id} title={title} rowImage image={image} />
      </View>
      {isPeeSelected &&
        isPeeSelected?.map((item: any) => {
          return (
            item?.id === id && item?.pee && (
              <View key={item?.id} style={styles.innerContainer}>
                <MaterialIcons
                  name="waterfall-chart"
                  size={
                    SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32
                  }
                  color={Colors.primary}
                  style={styles.iconStyle}
                />
                <HeaderText text={item?.pee + ' pee breaks'} />
              </View>
            )
          );
        })}
      {isPooSelected &&
        isPooSelected?.map((item: any) => {
          return (
            item?.id === id && item?.poo && (
              <View key={item?.id} style={styles.innerContainer}>
                <MaterialCommunityIcons
                  name="emoticon-poop"
                  size={
                    SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32
                  }
                  color={Colors.primary}
                  style={styles.iconStyle}
                />
                <HeaderText text={item?.poo + ' poo breaks'} />
              </View>
            )
          );
        })}
      {isFoodSelected &&
        isFoodSelected?.map((item: any) => {
          return (
            item?.id === id && item?.food &&  (
              <View key={item?.id} style={styles.innerContainer}>
                <MaterialCommunityIcons
                  name="pot-mix-outline"
                  size={
                    SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32
                  }
                  color={Colors.primary}
                  style={styles.iconStyle}
                />
                <HeaderText text={item?.food + ' food breaks'} />
              </View>
            )
          );
        })}
      {isWaterSelected &&
        isWaterSelected?.map((item: any) => {
          return (
            item?.id === id && item?.water && (
              <View key={item?.id} style={styles.innerContainer}>
                <Entypo
                  name="water"
                  size={
                    SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32
                  }
                  color={Colors.primary}
                  style={styles.iconStyle}
                />
                <HeaderText text={item?.water + ' water breaks'} />
              </View>
            )
          );
        })}
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
